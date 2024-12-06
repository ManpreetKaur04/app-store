from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import FileSystemStorage
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.db.models import Sum
from .serializers import *
from .models import *
import json



@csrf_exempt
def check_role(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            user = User.objects.get(username=username)
            return JsonResponse({'role': 'admin' if user.is_superuser else 'user'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

@api_view(['POST'])
def login_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        # If user exists, generate or retrieve the token
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        if not data.get('email') or '@' not in data['email']:
            return Response({'error': 'Invalid email address'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])
        user.save()
        return Response({'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
    })

@csrf_exempt
def admin_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        try:
            user = authenticate(username=username, password=password)
            if user and user.is_superuser:
                login(request, user)
                return JsonResponse({'message': 'Admin login successful'})
            return JsonResponse({'error': 'Invalid credentials or not an admin'}, status=403)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def list_android_apps(request):
    apps = AndroidApp.objects.all().values('id', 'app_name', 'app_link', 'category', 'subcategory', 'points', 'logo')

    app_list = []
    for app in apps:
        app_data = app.copy()
        if not app_data['logo']:
            # Set a placeholder URL for apps without a logo
            app_data['logo'] = request.build_absolute_uri('/media/default_logo.png')
        else:
            # Build the full URL for the logo
            app_data['logo'] = request.build_absolute_uri(f"{settings.MEDIA_URL}{app_data['logo']}")
        app_list.append(app_data)

    return JsonResponse(app_list, safe=False)


@csrf_exempt
def add_android_app(request):
    if request.method == 'POST':
        app_name = request.POST.get('app_name')
        app_link = request.POST.get('app_link')
        category = request.POST.get('category')
        subcategory = request.POST.get('subcategory')
        points = request.POST.get('points')
        logo = request.FILES.get('logo')

        if app_name and app_link and category and points:
            app = AndroidApp.objects.create(
                app_name=app_name,
                app_link=app_link,
                category=category,
                subcategory=subcategory,
                points=points,
                logo=logo
            )
            return JsonResponse({'message': 'App added successfully', 'app_id': app.id})
        return JsonResponse({'error': 'Missing required fields'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def admin_logout_view(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Logged out successfully."}, status=200)
    return JsonResponse({"error": "Invalid request method."}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def app_details(request, app_id):
    try:
        app = AndroidApp.objects.get(id=app_id)  # Ensure you're querying AndroidApp
        app_data = {
            'app_name': app.app_name,
            'app_link': app.app_link,
            'category': app.category,
            'subcategory': app.subcategory,
            'points': app.points,
            'logo': app.logo.url if app.logo else None
        }
        return Response(app_data)
    except AndroidApp.DoesNotExist:
        return Response({'error': 'App not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_proof(request, app_id):
    try:
        app = AndroidApp.objects.get(id=app_id)
        user = request.user
        proof_image = request.FILES.get('proof_image')
        
        if not proof_image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        # File type validation
        if not proof_image.name.endswith(('png', 'jpg', 'jpeg')):
            return Response({'error': 'Invalid file type. Only PNG, JPG, JPEG are allowed.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save proof image
        fs = FileSystemStorage()
        filename = fs.save(proof_image.name, proof_image)
        file_url = fs.url(filename)

        user_task, created = UserTask.objects.get_or_create(user=user, app=app)
        user_task.proof_image = file_url
        user_task.status = 'completed'
        user_task.save()

        return Response({'message': 'Proof uploaded successfully!'}, status=status.HTTP_200_OK)
    except AndroidApp.DoesNotExist:
        return Response({'error': 'App not found'}, status=status.HTTP_404_NOT_FOUND)
    
class TaskCompletionView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated to view the tasks
    
    def get(self, request, format=None):
        # Retrieve all tasks (you can filter based on status or user if needed)
        tasks = UserTask.objects.filter(user=request.user, status='completed')  # You can add filters like .filter(status='completed') to narrow down the results
        
        # Serialize the tasks
        serializer = UserTaskSerializer(tasks, many=True, context={'request': request})
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class UploadProofView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # Allow file uploads
    
    def post(self, request, task_id, format=None):
        try:
            task = UserTask.objects.get(id=task_id, user=request.user)  # Find the task for the logged-in user
            if task.status == 'completed':
                return Response({"detail": "Task already completed."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Update the task with the proof image
            task.proof_image = request.FILES.get('proof_image')
            task.status = 'completed'  # Mark the task as completed
            task.save()

            serializer = UserTaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except UserTask.DoesNotExist:
            return Response({"detail": "Task not found."}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['GET'])
def user_points(request):
    if request.user.is_authenticated:
        # Sum the points from the related AndroidApp for completed tasks
        total_points = UserTask.objects.filter(user=request.user, status="completed").aggregate(
            total_points=Sum('app__points')
        )['total_points'] or 0  # Use 'app__points' to access the related model's points field
        return Response({"points": total_points}, status=200)
    return Response({"error": "User not authenticated"}, status=401)

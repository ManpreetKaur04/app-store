from django.urls import path
from .views import *

urlpatterns = [
    # Role and authentication
    path('api/check-role/', check_role, name='check-role'),
    path('api/user-login/', login_user, name='login-user'),
    path('api/user-register/', register_user, name='register-user'),
    path('api/admin-login/', admin_login, name='admin-login'),
    path('api/logout/', admin_logout_view, name='admin-logout'),

    # App management
    path('api/add-app/', add_android_app, name='add-android-app'),
    path('api/list-apps/', list_android_apps, name='list-android-apps'),
    path('api/app-details/<int:app_id>/', app_details, name='app-details'),

    # Proof upload
    path('api/upload-proof/<int:app_id>/', upload_proof, name='upload-proof'),

    # User tasks and points
    path('tasks/completed/', TaskCompletionView.as_view(), name='completed-tasks'), 
    path('api/user-points/', user_points, name='user-points'),
    path('api/user-details/', user_details, name='user-details'),
]

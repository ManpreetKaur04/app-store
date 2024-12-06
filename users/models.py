from django.db import models
from django.contrib.auth.models import User

class AndroidApp(models.Model):
    app_name = models.CharField(max_length=255)
    app_link = models.URLField()
    category = models.CharField(max_length=100)
    subcategory = models.CharField(max_length=100)
    points = models.IntegerField()
    logo = models.ImageField(upload_to='media/app_logos/', null=True, blank=True)
    def __str__(self):
        return self.app_name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

class UserTask(models.Model):
    STATUS_CHOICES = [('completed', 'Completed'), ('pending', 'Pending')]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    app = models.ForeignKey(AndroidApp, on_delete=models.CASCADE)
    proof_image = models.ImageField(upload_to='proof_images/', null=True, blank=True)  # Proof image
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    proof_uploaded_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)  # Track when proof is uploaded

    def __str__(self):
        return f"{self.user.username} - {self.app.app_name} - {self.status}"
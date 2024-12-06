from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class AppSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    def get_logo(self, obj):
        request = self.context.get('request')
        if obj.logo:
            return request.build_absolute_uri(obj.logo.url)
        return None
    class Meta:
        model = AndroidApp
        fields = ['id', 'app_name', 'category', 'points', 'logo']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'points']

class UserTaskSerializer(serializers.ModelSerializer):
    app = AppSerializer()
    user = serializers.StringRelatedField()  # You can display the user's username instead of the user ID

    class Meta:
        model = UserTask
        fields = ['id', 'user', 'app', 'proof_image', 'status']

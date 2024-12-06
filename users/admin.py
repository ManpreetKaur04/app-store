from django.contrib import admin
from .models import AndroidApp,  UserProfile, UserTask

class AndroidAppAdmin(admin.ModelAdmin):
    list_display = ('app_name', 'category', 'points', 'app_link', 'logo')
    search_fields = ('app_name', 'category')
    list_filter = ('category', 'subcategory')
    ordering = ('-points',)  # Orders apps by points in descending order

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'points')
    search_fields = ('user__username',)
    ordering = ('user__username',)

class UserTaskAdmin(admin.ModelAdmin):
    list_display = ('user', 'app', 'status', 'proof_image')
    search_fields = ('user__username', 'app__app_name')
    list_filter = ('status',)
    ordering = ('-status',)  # Orders tasks by status (pending first)


# Registering models with the admin site
admin.site.register(AndroidApp, AndroidAppAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(UserTask, UserTaskAdmin)

from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models.user import User
from .models.profile import Profile

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    fieldsets = UserAdmin.fieldsets + (
        ("Custom Fields", {"fields": ("middle_name",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Custom Fields", {"fields": ("middle_name",)}),
    )

    list_display = ["username", "email", "first_name", "last_name", "middle_name", "is_staff"]
    search_fields = ["username", "email", "first_name", "last_name", "middle_name"]

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "bio"]
    search_fields = ["user__username", "user__email", "bio"]

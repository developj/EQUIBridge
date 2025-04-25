from django.urls import path
from api.views.auth_views import RegisterView, LoginView, ProfileView
from api.views.social_views import GoogleLogin

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("google-login/", GoogleLogin.as_view(), name="google_login"),
]

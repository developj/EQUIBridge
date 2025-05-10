from django.urls import path
from api.views.auth_views import RegisterView, LoginView, ProfileView
from api.views.social_views import CustomGoogleLoginView
from api.views.adzuna_job_views import AdzunaJobSearchView
from api.views.ai_chat_views import ChatAPIView
from api.views.jobicy_job_views import JobicyJobSearchView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("google-login/", CustomGoogleLoginView.as_view(), name="google_login"),
    path("adzuna/search/", AdzunaJobSearchView.as_view(), name="adzuna_search"),
    path("text/chat/", ChatAPIView.as_view(), name="chat-input"),
    path("remote-jobs/", JobicyJobSearchView.as_view(), name="jobicy_jobs"),
]


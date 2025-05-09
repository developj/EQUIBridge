from django.urls import path
from .views import GenerateResumePDF

urlpatterns = [
    path('resume/', GenerateResumePDF.as_view(), name='generate_resume_pdf'),
]

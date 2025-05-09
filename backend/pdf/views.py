from django.http import HttpResponse
from django.template import loader
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.models.profile import Profile
import pdfkit

class GenerateResumePDF(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            user_profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return HttpResponse("Profile not found.", status=404)

        template = loader.get_template('pdf/resume.html')
        html = template.render({'user_profile': user_profile})

        options = {
            'page-size': 'Letter',
            'encoding': 'UTF-8',
        }


        pdf = pdfkit.from_string(html, False, options=options)
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="resume.pdf"'
        return response

import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from api.serializers.adzuna_job_serializer import AdzunaJobSearchSerializer
from api.jobs.azuna_job import fetch_adzuna_jobs  

class AdzunaJobSearchView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = AdzunaJobSearchSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = fetch_adzuna_jobs(**serializer.validated_data)
                return Response(data, status=status.HTTP_200_OK)
            except requests.HTTPError as e:
                return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

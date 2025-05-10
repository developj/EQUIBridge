import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from api.serializers.jobicy_job_serializer import JobicyJobSearchSerializer
from api.jobs.jobicy_job import fetch_jobicy_jobs

class JobicyJobSearchView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = JobicyJobSearchSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            jobs = fetch_jobicy_jobs(**serializer.validated_data)
            return Response(jobs, status=status.HTTP_200_OK)
        except requests.HTTPError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )

# your_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("OPENAI_KEY",os.getenv("OPENAI_KEY")))

class ChatAPIView(APIView):
    [permissions.IsAuthenticated]

    def post(self, request):
        message = request.data.get("message", "")
        if not message:
            return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": message}],
        )
        text = completion.choices[0].message.content
        return Response({"reply": text},status=status.HTTP_200_OK)

FROM python:3.11

# Don’t write .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
# Don’t buffer stdout/stderr (good for logging)
ENV PYTHONUNBUFFERED=1

# Set Django environment variable for allowed hosts (optional but safer)
ENV ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0,equibridgeapi.onrender.com,localhost,127.0.0.1,equibridge.onrender.com,htts://equibridge-2.onrender.com

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# Expose port 8000 to match Django's default dev server port
EXPOSE 8000

# Set environment variables for superuser (you can override via docker-compose)
ENV DJANGO_SUPERUSER_USERNAME=admin
ENV DJANGO_SUPERUSER_EMAIL=admin@example.com
ENV DJANGO_SUPERUSER_PASSWORD=admin123

# Run migrations + create superuser + run server
CMD ["sh", "-c", "python manage.py migrate && python create_superuser.py && python manage.py runserver 0.0.0.0:8000"]
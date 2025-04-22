# FROM python:3.11

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# WORKDIR /app

# COPY requirements.txt .
# RUN pip install --upgrade pip && pip install -r requirements.txt

# COPY . .

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

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

# Apply migrations, then run the server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

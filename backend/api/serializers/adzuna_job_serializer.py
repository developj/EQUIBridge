from rest_framework import serializers

class AdzunaJobSearchSerializer(serializers.Serializer):
    query = serializers.CharField(required=False, default="health worker")
    location = serializers.CharField(required=False, default="usa")
    results_per_page = serializers.IntegerField(required=False, default=10, min_value=1)
    page = serializers.IntegerField(required=False, default=1, min_value=1)

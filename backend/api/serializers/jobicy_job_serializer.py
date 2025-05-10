from rest_framework import serializers

class JobicyJobSearchSerializer(serializers.Serializer):
    count = serializers.IntegerField(
        required=False, default=20, min_value=1,
        help_text="How many jobs to fetch (default 5)"
    )
    geo = serializers.CharField(
        required=False, allow_blank=True, default="",
        help_text="Region filter, e.g. 'usa'"
    )
    industry = serializers.CharField(
        required=False, allow_blank=True, default="",
        help_text="Industry filter, e.g. 'engineering'"
    )
    tag = serializers.CharField(
        required=False, allow_blank=True, default="",
        help_text="Optional tag filter, e.g. 'react'"
    )

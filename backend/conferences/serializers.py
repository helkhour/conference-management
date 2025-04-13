from rest_framework import serializers
from .models import Conference
from doctors.models import Doctor

class ConferenceSerializer(serializers.ModelSerializer):
    invited_doctors = serializers.PrimaryKeyRelatedField(many=True, queryset=Doctor.objects.all())

    class Meta:
        model = Conference
        fields = ['id', 'title', 'start_date', 'end_date', 'destination', 'location', 'description', 'invited_doctors', 'is_archived']
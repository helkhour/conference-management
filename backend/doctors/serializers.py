from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
    conference_ids = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            'id',
            'first_name',
            'last_name',
            'specialty',
            'affiliation',
            'email',
            'phone',
            'is_archived',
            'conference_ids'
        ]

    def get_conference_ids(self, obj):
        return [
            {
                'id': conf.id,
                'title': conf.title,
                'is_archived': conf.is_archived
            }
            for conf in obj.conferences.all()  # Include all conferences
        ]

    def validate_email(self, value):
        instance = self.instance
        if instance and instance.email == value:
            return value
        if Doctor.objects.filter(email=value).exists():
            raise serializers.ValidationError("A doctor with this email already exists.")
        return value
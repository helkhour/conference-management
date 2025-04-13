from rest_framework import serializers
from .models import Doctor
from conferences.models import Conference

class DoctorSerializer(serializers.ModelSerializer):
    conferences = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

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
            'conferences'
        ]

    def validate_email(self, value):
        """
        Ensure email is unique when creating or updating a doctor.
        """
        if self.instance is None and Doctor.objects.filter(email=value).exists():
            raise serializers.ValidationError("A doctor with this email already exists.")
        return value
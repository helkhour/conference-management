from rest_framework import serializers
from .models import Cost
from conferences.models import Conference
from doctors.models import Doctor
from conferences.serializers import ConferenceSerializer
from doctors.serializers import DoctorSerializer

class CostSerializer(serializers.ModelSerializer):
    conference = serializers.PrimaryKeyRelatedField(queryset=Conference.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
    # Optional: Include nested serializers for readable output
    conference_detail = ConferenceSerializer(source='conference', read_only=True)
    doctor_detail = DoctorSerializer(source='doctor', read_only=True)

    class Meta:
        model = Cost
        fields = [
            'id',
            'conference',
            'doctor',
            'amount',
            'conference_detail',
            'doctor_detail'
        ]

    def validate(self, data):
        """
        Ensure the cost entry is unique for a doctor-conference pair.
        """
        if self.instance is None and Cost.objects.filter(
            conference=data['conference'],
            doctor=data['doctor']
        ).exists():
            raise serializers.ValidationError("This doctor already has a cost entry for this conference.")
        return data
from rest_framework import serializers
from .models import Cost
from conferences.models import Conference
from doctors.models import Doctor

class CostSerializer(serializers.ModelSerializer):
    conference = serializers.PrimaryKeyRelatedField(queryset=Conference.objects.filter(is_archived=False))
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.filter(is_archived=False))
    year = serializers.ReadOnlyField()

    class Meta:
        model = Cost
        fields = [
            'id',
            'conference',
            'doctor',
            'amount',
            'year',
        ]

    def validate(self, data):
        if self.instance is None:
            if Cost.objects.filter(
                conference=data['conference'],
                doctor=data['doctor']
            ).exists():
                raise serializers.ValidationError("Cost entry for this doctor and conference already exists.")
        return data
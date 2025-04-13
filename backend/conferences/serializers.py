from rest_framework import serializers
from .models import Conference
from doctors.models import Doctor

class ConferenceSerializer(serializers.ModelSerializer):
    invited_doctors = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Doctor.objects.filter(is_archived=False),
        required=False
    )
    invited_doctors_detail = serializers.SerializerMethodField()
    warning = serializers.CharField(read_only=True, required=False)

    class Meta:
        model = Conference
        fields = [
            'id',
            'title',
            'start_date',
            'end_date',
            'destination',
            'location',
            'description',
            'is_archived',
            'invited_doctors',
            'invited_doctors_detail',
            'warning'
        ]

    def get_invited_doctors_detail(self, obj):
        return [
            {
                'id': doctor.id,
                'first_name': doctor.first_name,
                'last_name': doctor.last_name,
                'specialty': doctor.specialty
            }
            for doctor in obj.invited_doctors.all()
        ]

    def validate(self, data):
        validated_data = super().validate(data)
        title = data.get('title')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        instance = self.instance

        warnings = []
        if title and Conference.objects.filter(
            title__iexact=title
        ).exclude(id=instance.id if instance else None).exists():
            warnings.append(f"A conference named '{title}' already exists.")
        if start_date and end_date:
            overlapping = Conference.objects.filter(
                is_archived=False,
                start_date__lte=end_date,
                end_date__gte=start_date
            ).exclude(id=instance.id if instance else None)
            if overlapping.exists():
                warnings.append("A conference exists with overlapping dates.")
        if warnings:
            validated_data['warning'] = " ".join(warnings)
        if start_date and end_date and end_date < start_date:
            raise serializers.ValidationError("End date cannot be before start date.")
        return validated_data
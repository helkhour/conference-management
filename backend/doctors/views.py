from rest_framework import viewsets
from .models import Doctor
from .serializers import DoctorSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.filter(is_archived=False)
    serializer_class = DoctorSerializer
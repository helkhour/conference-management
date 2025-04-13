from rest_framework import viewsets
from .models import Conference
from .serializers import ConferenceSerializer

class ConferenceViewSet(viewsets.ModelViewSet):
    queryset = Conference.objects.filter(is_archived=False)
    serializer_class = ConferenceSerializer
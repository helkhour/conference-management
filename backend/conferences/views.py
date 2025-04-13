from rest_framework import viewsets
from .models import Conference
from .serializers import ConferenceSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class ConferenceViewSet(viewsets.ModelViewSet):
    queryset = Conference.objects.filter(is_archived=False)
    serializer_class = ConferenceSerializer

    def perform_destroy(self, instance):
        """
        Archive instead of deleting.
        """
        instance.is_archived = True
        instance.save()

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """
        Explicitly archive a conference.
        """
        conference = self.get_object()
        conference.is_archived = True
        conference.save()
        return Response({'status': 'conference archived'})
    
    def get_queryset(self):
        # For list views, exclude archived conferences
        if self.action == 'list':
            queryset = Conference.objects.filter(is_archived=False)
        else:
            # For detail views, include all conferences
            queryset = Conference.objects.all()
        
        # Existing filtering for search
        doctor_id = self.request.query_params.get('doctor_id')
        year = self.request.query_params.get('year')
        sort_by = self.request.query_params.get('sort_by', 'start_date')
        if doctor_id:
            queryset = queryset.filter(invited_doctors__id=doctor_id)
        if year:
            queryset = queryset.filter(start_date__year=year)
        if sort_by in ['title', '-title', 'start_date', '-start_date', 'location', '-location']:
            queryset = queryset.order_by(sort_by)
        return queryset
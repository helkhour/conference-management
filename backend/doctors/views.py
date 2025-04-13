from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Doctor
from .serializers import DoctorSerializer
from costs.models import Cost
from django.db.models import Sum

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.filter(is_archived=False)
    serializer_class = DoctorSerializer

    def perform_destroy(self, instance):
        """
        Archive instead of deleting.
        """
        instance.is_archived = True
        instance.save()

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """
        Explicitly archive a doctor.
        """
        doctor = self.get_object()
        doctor.is_archived = True
        doctor.save()
        return Response({'status': 'doctor archived'})

    @action(detail=True, methods=['get'], url_path='total-cost')
    def total_cost(self, request, pk=None):
        year = request.query_params.get('year')
        try:
            query = Cost.objects.filter(doctor_id=pk)
            if year:
                query = query.filter(year=year)
            total = query.aggregate(total_amount=Sum('amount'))['total_amount'] or 0
            return Response({
                'doctor_id': pk,
                'year': year or 'all',
                'total_amount': float(total)
            })
        except Exception as e:
            return Response({'error': str(e)}, status=400)
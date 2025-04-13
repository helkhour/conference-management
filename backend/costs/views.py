from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Cost
from .serializers import CostSerializer

class CostViewSet(viewsets.ModelViewSet):
    queryset = Cost.objects.all()
    serializer_class = CostSerializer

    @action(detail=False, methods=['get'], url_path='total/(?P<doctor_id>\d+)/(?P<year>\d+)')
    def total_cost(self, request, doctor_id=None, year=None):
        try:
            total = Cost.objects.filter(
                doctor_id=doctor_id,
                conference__start_date__year=year
            ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0
            return Response({
                'doctor_id': doctor_id,
                'year': year,
                'total_amount': float(total)
            })
        except Exception as e:
            return Response({'error': str(e)}, status=400)
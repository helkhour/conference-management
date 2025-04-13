from rest_framework import viewsets
from .models import Cost
from .serializers import CostSerializer

class CostViewSet(viewsets.ModelViewSet):
    queryset = Cost.objects.all()
    serializer_class = CostSerializer
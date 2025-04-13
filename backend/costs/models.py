from django.db import models
from conferences.models import Conference
from doctors.models import Doctor

class Cost(models.Model):
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE, related_name='costs')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='costs')
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def year(self):
        return self.conference.start_date.year if self.conference.start_date else None

    def __str__(self):
        return f"{self.doctor} - {self.conference} ({self.year})"

    class Meta:
        unique_together = ['conference', 'doctor']
        ordering = ['conference__start_date', 'conference__title']
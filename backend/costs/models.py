from django.db import models

class Cost(models.Model):
    conference = models.ForeignKey('conferences.Conference', on_delete=models.CASCADE, related_name='costs')
    doctor = models.ForeignKey('doctors.Doctor', on_delete=models.CASCADE, related_name='costs')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.doctor} - {self.conference}: ${self.amount}"

    class Meta:
        unique_together = ['conference', 'doctor']
        ordering = ['conference__start_date']
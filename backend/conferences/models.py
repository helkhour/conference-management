from django.db import models

class Conference(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    destination = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    invited_doctors = models.ManyToManyField('doctors.Doctor', related_name='conferences')
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['start_date']
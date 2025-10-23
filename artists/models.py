from django.db import models

class Artists(models.Model):
    name = models.CharField(max_length=100, blank=False)
    country = models.CharField(max_length=100, blank=False)
    genre = models.CharField(max_length=100)

    def __str__(self):
        return self.name
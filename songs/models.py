from django.db import models
from artists.models import Artists

class Songs(models.Model):
    title = models.CharField(max_length=100, blank=False)
    album = models.CharField(max_length=100, blank=False)
    genre = models.CharField(max_length=100, blank=False)
    release_date = models.DateTimeField(blank=False)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE, related_name='songs')

    def __str__(self):
        return self.title
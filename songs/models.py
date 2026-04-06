from django.db import models
from artists.models import Artists
from django.conf import settings
from django.utils import timezone


class Songs(models.Model):
    title = models.CharField(max_length=100, blank=False)
    album = models.CharField(max_length=100, blank=False)
    genre = models.CharField(max_length=100, blank=False)
    release_date = models.DateTimeField(blank=False)
    score = models.IntegerField(blank=False, default=0)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE, related_name='songs')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_songs', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']
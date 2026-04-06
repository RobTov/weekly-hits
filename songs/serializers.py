from rest_framework import serializers
from .models import Songs


class SongSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    
    class Meta:
        model = Songs
        fields = ['id', 'title', 'album', 'genre', 'release_date', 'score', 'artist', 'artist_name', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

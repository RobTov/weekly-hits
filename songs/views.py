from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .models import Songs
from .serializers import SongSerializer


class IsCreatorOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_administrator:
            return True
        return obj.created_by == request.user


class SongViewSet(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsCreatorOrAdmin]
    
    def get_queryset(self):
        queryset = Songs.objects.all()
        
        if self.action == 'list':
            genre = self.request.query_params.get('genre')
            if genre:
                queryset = queryset.filter(genre__iexact=genre)
            
            search = self.request.query_params.get('search')
            if search:
                queryset = queryset.filter(title__icontains=search)
            
            return queryset.select_related('artist', 'created_by')
        
        return queryset.select_related('artist', 'created_by')
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()


class TopSongsView(generics.ListAPIView):
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return Songs.objects.order_by('-score')[:10]

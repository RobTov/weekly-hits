from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'songs', views.SongViewSet, basename='song')

urlpatterns = [
    path('', include(router.urls)),
    path('top-songs/', views.TopSongsView.as_view(), name='top-songs'),
]
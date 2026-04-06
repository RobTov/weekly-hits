from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLES = [
        ('administrator', 'Administrador'),
        ('musical_programmer', 'Programador Musical'),
    ]
    
    role = models.CharField(max_length=50, choices=ROLES, default='musical_programmer')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    @property
    def is_administrator(self):
        return self.role == 'administrator'
    
    @property
    def is_musical_programmer(self):
        return self.role == 'musical_programmer'

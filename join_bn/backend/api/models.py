from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Notes(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    category = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True )
    author = models.ForeignKey(User, on_delete= models.CASCADE, related_name="notes")

    def __str__(self):
        return f"{self.title}"
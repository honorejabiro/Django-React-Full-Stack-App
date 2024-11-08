from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Notes
from rest_framework.exceptions import ValidationError

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        username = validated_data.get('username')
        if User.objects.filter(username=username).exists():
            raise ValidationError("A user with this username already exists.")
        user = User.objects.create_user(**validated_data)
        return user
    
class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        moedel = Notes
        fields = "__all__"
        extra_kwargs = {"author":{"read_only": True}}
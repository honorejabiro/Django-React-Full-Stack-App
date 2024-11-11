from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import Notes
from .serializers import UserSerializers, NotesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    serializer = UserSerializers(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST","GET"])
@permission_classes([IsAuthenticated])
def create_note(request):
    if request.method == 'POST':
        author = request.user
        serializers = NotesSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save(author=author)
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        author = request.user
        notes = Notes.objects.filter(author=author)
        serializers = NotesSerializer(notes, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_note(request, id):
    author = request.user
    try:
        note = Notes.objects.get(id=id, author=author)
        note.delete()
        return Response({"message": "Note deleted successfully."}, status=status.HTTP_200_OK)
    except Notes.DoesNotExist:
        return Response({"error": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.create_note, name="create"),
    path('note/delete/<int:id>/', views.delete_note, name='delete_note')
]
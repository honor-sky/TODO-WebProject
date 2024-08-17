

from django.contrib import admin
from django.urls import path

from todolist import views

urlpatterns = [
    path('', views.todoList, name = "todoList"),
    path('delete/<int:pk>', views.deleteTask, name='deleteTask'),
    path('add/', views.addTask, name='addTask'),
]
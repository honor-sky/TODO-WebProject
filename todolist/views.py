from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST, require_GET
from response import Response
from rest_framework import status

from todolist.models import Todo


def todoList(request):
    tasks = Todo.objects.all()
    return render(request, 'todolist_index.html', {"tasks":tasks})


@require_POST
def addTask(request):
    if(request.method == 'POST'):
        content = request.POST.get('to-do')
        if content:
            task = Todo()
            task.task = content
            task.is_done = False
            task.save()

    #tasks = Todo.objects.all()
    return todoList() #render(request, 'todolist_index.html', {"tasks":tasks})




@require_GET
def deleteTask(request, pk):
    if (request.method == 'GET'):
        task = Todo.objects.get(id_todo=pk)
        task.delete()


    tasks = Todo.objects.all()
    return render(request, 'todolist_index.html', {"tasks": tasks})



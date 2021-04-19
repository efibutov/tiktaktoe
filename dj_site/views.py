from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse('<h1>Main index</h1><br /><a href="ttt/">Tik-tak-toe</a>')


def new_game(request):
    return HttpResponse('new game')

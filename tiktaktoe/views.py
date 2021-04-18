from django.shortcuts import render
from django.http import HttpResponse
from .models import Game


def index(request):
    games = Game.objects.all()
    # return HttpResponse('Hello world')
    return render(request=request, template_name='tiktaktoe/index.html', context={'games': games})


def new_game(request):
    """
    A new game view
    """
    return HttpResponse('new game')
    # return render(
    #     request=request,
    #     context={'data': (list() * 3) * 3},
    #     template_name='./index.html'
    # )


def old_game(request, game_id):
    return HttpResponse(f'You\'re looking at game {game_id}')


def old_games(request):
    return render(
        request=request,
        template_name='tiktaktoe/old_games.html',
        context={'games': Game.objects.all()}
    )


def start_new_game(request):
    return render(
        request=request,
        template_name='tiktaktoe/new_game.html',
        context=dict()
    )

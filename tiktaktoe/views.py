from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Game
import json


def index(request):
    games = Game.objects.all()
    return render(
        request=request,
        template_name='tiktaktoe/index.html',
        context={'games': games}
    )


def old_game(request, game_id):
    return HttpResponse(f'You\'re looking at game {game_id}')


def old_games(request):
    return render(
        request=request,
        template_name='tiktaktoe/old_games.html',
        context={'games': Game.objects.all()}
    )


def new_game(request):
    return render(
        request=request,
        template_name='tiktaktoe/new_game.html',
        context={}
    )


@csrf_exempt
def save_game(request):
    """
    Saving a game to persistent storage (DataBase)
    """
    return redirect('old_games')


def make_retaliatory_move(board):
    pass


@csrf_exempt
def make_move(request):
    payload = json.loads(str(request.body, encoding='utf8'))
    board = payload['board']
    i = payload['clickOn']['i']
    j = payload['clickOn']['j']
    current_letter = payload['currentLetter']

    if board[i][j] is None:
        board[i][j] = current_letter

    return JsonResponse({'board': board})

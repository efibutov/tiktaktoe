from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new_game/', views.new_game, name='new_game'),
    path('old_game/', views.old_games, name='old_games'),
    path('old_game/<int:game_id>', views.old_game, name='old_game'),
    path('start_new_game/', views.start_new_game, name='start_new_game'),
]

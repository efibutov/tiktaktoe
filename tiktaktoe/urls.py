from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new_game/', views.new_game, name='new_game'),
    path('old_game/', views.old_games, name='old_games'),
    path('old_game/<int:game_id>', views.old_game, name='old_game'),
    path('new_game/', views.new_game, name='new_game'),
    path('make_move/', views.make_move, name='make_move'),

]

from django.db import models
from django.contrib.auth.models import User


class Game(models.Model):
    start = models.DateTimeField(auto_now=True)
    end = models.DateTimeField(auto_now=True)
    gamer_1 = models.OneToOneField(User, on_delete=models.CASCADE, related_name='gamer_1')
    gamer_2 = models.OneToOneField(User, on_delete=models.CASCADE, related_name='gamer_2')
    game_board_size = models.PositiveIntegerField()
    winner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='winner', null=True, blank=True)
    loser = models.OneToOneField(User, on_delete=models.CASCADE, related_name='loser', null=True, blank=True)

    def __str__(self):
        return f'Start = {self.start}, end = {self.end}, gamer_1 = {self.gamer_1}, gamer_2 = {self.gamer_1}'

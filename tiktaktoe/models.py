from django.db import models
from django.contrib.auth.models import User


class Game(models.Model):
    start = models.DateTimeField(auto_now=True)
    end = models.DateTimeField(auto_now=True)
    gamer = models.OneToOneField(User, on_delete=models.CASCADE, related_name='gamer_1')
    game_board_size = models.PositiveIntegerField()
    win = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f'Start = {self.start}, end = {self.end}, gamer = {self.gamer}'

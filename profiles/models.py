from django.db import models
from django.conf import settings

from django.db.models.signals import post_save

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='is_following', blank=True)  # user.is_following.all()
    birth_date = models.DateField(null=True, blank=True)


def post_save_user_receiver(sender, instance, created, *args, **kwargs):
    if created:
        default_user = User.objects.get(id=1) #user__username=
        default_user.followers.add(instance)


post_save.connect(post_save_user_receiver, sender=User)

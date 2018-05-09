from django.contrib.auth.models import User, Group

from rest_framework import serializers

from .models import Movie, Rating


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User 
        fields = ("username", "email")

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ("url", "name")


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ("id",'title', "description")


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ("stars","movie", "user")
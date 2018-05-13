from django.contrib.auth.models import User, Group

from rest_framework import serializers

from .models import Movie, Rating


class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    # Adding additional kwargs that allow for variable to not show with simple api pulls
    class Meta:
        model = User 
        fields = ("id","username", "email", "password")
        extra_kwargs = { "password" : { "write_only": True, "required": True}}
        
    # Overriding create method that takes advantage of django validated_data and hashes password automatically 
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ("id",'title', "description", "avg_rating", "total_ratings")


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ("stars","movie", "user")
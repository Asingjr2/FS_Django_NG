from django.contrib.auth.models import User, Group

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import UserSerializer, GroupSerializer, MovieSerializer, RatingSerializer
from .models import Movie, Rating


# Can add authentication per viewset or specific type of call
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Will add custom validation on entry into site
    # permission_classes = (IsAuthenticated, )
    # authentication_classes = (TokenAuthentication, SessionAuthentication)


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # Will add custom validation on entry into site
    # permission_classes = (IsAuthenticated, )
    # authentication_classes = (TokenAuthentication, SessionAuthentication)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    # Will add custom validation on entry into site
    # permission_classes = (IsAuthenticated, )
    # authentication_classes = (TokenAuthentication, SessionAuthentication)
    

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])
        user = User.objects.get(id=token.user_id)
        serializer = UserSerializer(user, many=False)
        return Response({"token":token.key, "user":serializer.data})
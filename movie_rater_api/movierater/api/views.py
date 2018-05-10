from django.contrib.auth.models import User, Group

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import list_route
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import UserSerializer, MovieSerializer, RatingSerializer
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

    # Creating method to allow a rating. Route is add as subset of ratings which is defined in urls and assigned to this viewset
    @list_route(methods=["POST"])
    def rate_movie(self, request):
        if "movie" in request.data and "user" in request.data and "stars" in request.data:
            stars = int(request.data["stars"])
            movie = Movie.objects.get(id=request.data["movie"])
            user = User.objects.get(id=request.data["user"])

            # Creating logic to differentiate updates versus creates w/ response values
            try:
                my_rating = Rating.objects.get(movie=movie.id, user=user.id)
                my_rating.stars = stars
                my_rating.save()
                serializer = MovieSerializer(movie, many=False)
                response = {"message":"Rating updated","result":serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                Rating.objects.create(movie=movie, user=user, stars=stars)
                my_rating = Rating.objects.get(movie=movie.id, user=user.id)
                my_rating.stars = stars
                my_rating.save()
                serializer = MovieSerializer(movie, many=False)
                response = {"message":"Rating created","result":serializer.data}
                return Response(response, status=status.HTTP_200_OK)

          
        else:
            response = {"message": "You need to pass all params"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])
        user = User.objects.get(id=token.user_id)
        serializer = UserSerializer(user, many=False)
        return Response({"token":token.key, "user":serializer.data})
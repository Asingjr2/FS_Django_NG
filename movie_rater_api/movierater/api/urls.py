from django.urls import path, include

from rest_framework import routers 

from .views import UserViewSet, MovieViewSet, RatingViewSet

from api.views import CustomObtainAuthToken


router= routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"movies", MovieViewSet)
router.register(r"ratings", RatingViewSet)

urlpatterns= [
    path("", include(router.urls)), 
    path("api-login/", include("rest_framework.urls")),
    path("authenticate/", CustomObtainAuthToken.as_view()), 
]


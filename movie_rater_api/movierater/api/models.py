from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Movie(models.Model):
    title = models.CharField(max_length=40)
    description = models.CharField(max_length= 255)

    def __str__(self):
        return "Movie {}".format(self.title)


class Rating(models.Model):
    stars = models.IntegerField(default=1, validators = [MinValueValidator(1), MaxValueValidator(5)])
    movie = models.ForeignKey(Movie, on_delete= models.CASCADE)
    user = models.ForeignKey(User, on_delete= models.CASCADE)

    class Meta:
        unique_together = (("movie","user", ),)
        index_together = (("movie", "user"),)

    def __str__(self):
        return "{} movie get {} star(s)".format(self.movie.title, self.stars)
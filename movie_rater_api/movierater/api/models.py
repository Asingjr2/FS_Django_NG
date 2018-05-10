from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Movie(models.Model):
    title = models.CharField(max_length=40)
    description = models.CharField(max_length= 255)

    def __str__(self):
        return "Movie {}".format(self.title)

    # Creating avg rating by using results of all users that added ratings... FILTER IS POWERFUL
    # Method returns a value that can be user as a serializer field "avg_rating"
    def avg_rating(self):
        ratings_sum = 0
        all_ratings = Rating.objects.filter(movie=self)
        for rating in all_ratings:
            ratings_sum += rating.stars
        count = all_ratings.count()
        if count > 0:
            return ratings_sum / all_ratings.count()
        else:
            return 0

    def total_ratings(self):
        return Rating.objects.filter(movie=self).count()

class Rating(models.Model):
    stars = models.IntegerField(default=1, validators = [MinValueValidator(1), MaxValueValidator(5)])
    movie = models.ForeignKey(Movie, on_delete= models.CASCADE)
    user = models.ForeignKey(User, on_delete= models.CASCADE)

    # Unique together creates constraint on number of ratings a user can give to a movie
    class Meta:
        unique_together = (("movie","user", ),)
        index_together = (("movie", "user"),)

    def __str__(self):
        return "{} movie get {} star(s)".format(self.movie.title, self.stars)
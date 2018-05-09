from django.contrib import admin

from .models import Movie, Rating


# admin.site.register(Movie)
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    fields = ("title", "description")
    list_display = ["title", "description"]
    search_fields = ("title", "description")


admin.site.register(Rating)
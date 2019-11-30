from django.db import models


class Property(models.Model):
    type = models.CharField(max_length=100)


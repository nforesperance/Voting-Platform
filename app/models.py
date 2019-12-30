from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.contenttypes.fields import GenericRelation

class Aspian(models.Model):
    name = models.CharField(max_length=100)
    matricule = models.CharField(max_length=100)
    def __str__(self):
        return self.name
class Election(models.Model):
    year = models.PositiveIntegerField() 
    registered = models.PositiveIntegerField(default=0)
    def __str__(self):
        return "Elections"+"("+ str(self.year) +")"
class Candidate(models.Model):
    choices = (
    ('President', 'President'),
    ('Vice President', 'Vice President'),
    ('Seceretary General', 'Seceretary General'),
    ('Assistant Secretary General', 'Assistant Secretary General'),
    ('Finacial Secretary', 'Finacial Secretary'),
    ('Treasurer', 'Treasurer'),
    ('Webmaster', 'Webmaster'),
    ('Public Relations Officer', 'Public Relations Officer'),
    ('Assistant Webmaster', 'Assistant Webmaster'),
    ('Project Coordinator', 'Project Coordinator'),
    ('Assistant Project Coordinator', 'Assistant Project Coordinator'),
    )
    aspian =  models.ForeignKey(Aspian, on_delete=models.CASCADE)
    election =  models.ForeignKey(Election, on_delete=models.CASCADE)
    post = models.CharField(max_length=200, choices=choices)
    votes = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.post+":"+ self.aspian.name
class Administators(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100,)
    def __str__(self):
        return self.username
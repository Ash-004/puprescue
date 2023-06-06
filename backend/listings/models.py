from django.contrib.gis.db import models
from django.utils import timezone
from django.contrib.gis.geos import Point
from django.contrib.auth import get_user_model
User = get_user_model()



class Listings(models.Model):
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, blank= True, null= True )
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    count = models.IntegerField(null=True, blank=True)

    choices_lt = (('Healthy','Healthy'),
                  ('Rabid','Rabid'),
                  ('Injured','Injured'))

    listing_type = models.CharField(max_length=20, choices=choices_lt)
    date_posted = models.DateTimeField(default=timezone.now)
    latitude = models.FloatField(blank = True, null = True)
    longitude = models.FloatField(blank = True, null = True)


    picture1 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture2 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture3 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture4 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture5 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")

    def __str__(self):
        return self.title
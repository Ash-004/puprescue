from .serializers import ListingSerializer
from ..models import Listings
from rest_framework import generics

class ListingList(generics.ListAPIView):
    queryset = Listings.objects.all()
    serializer_class = ListingSerializer

class ListingCreate(generics.CreateAPIView):
    queryset = Listings.objects.all()
    serializer_class = ListingSerializer

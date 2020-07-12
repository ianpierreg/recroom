from django.shortcuts import render

# Create your views here.
class RoomListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
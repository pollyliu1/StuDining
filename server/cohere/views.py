# linked to a single view from urls
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from django.http import HttpResponse
import cohere_logic


from .models import Footer
from .serializers import FooterSerializer


  
class SummaryView(APIView):
  permission_classes = (permissions.AllowAny, )

  def get(self, request, format=None):
    text = request.query_params.get('text', '')
    summary = cohere_logic.summarize(text)  # Call the function from cohere.py
    return Response({'summary': summary})


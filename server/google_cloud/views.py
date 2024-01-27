#views.py
from django.views.decorators.csrf import csrf_exempt
from django.views import View
import os
import requests
from django.conf import settings
from django.http import HttpResponse, Http404
import urllib.request

class Upload(View):
    
    def __init__(self):
        self.audio_file = None

    @csrf_exempt
    def post(self, request):
        if request.method == 'POST':
            print("getting post request")
            
            self.audio_file = request.FILES['audio'] # get the uploaded file
            with open('audio.webm', 'wb+') as destination:
                for chunk in self.audio_file.chunks():
                    destination.write(chunk)
            return HttpResponse("file uploaded")

        elif request.method == 'GET':
            print("getting get request")
            return HttpResponse("get request")
            
    def download(request, path):
        file_path = os.path.join(settings.MEDIA_ROOT, path)
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        raise Http404

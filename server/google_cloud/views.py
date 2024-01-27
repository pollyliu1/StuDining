#views.py
from django.views.decorators.csrf import csrf_exempt
from django.views import View
import os
import requests
from django.conf import settings
from django.http import HttpResponse, Http404
import urllib.request

class Upload(View):
    @csrf_exempt
    def post(self, request):
        if request.method == 'POST':
            print("getting post request")
            
            # Here, I'm using it with plupload.js for the chunked upload, but it would work anyway
            ... ## here, you'd do something with the headers
            file_name = "audio" # or some constant 'file_name_with_path.bin'
            url = (list(request.POST.keys())[0]).replace('blob:', '') # get it from the request 
            print(url)
            urllib.request.urlretrieve(url, 'video_name.webm') 
            response = requests.get(url, stream=True)
            file_path = os.path.join(settings.MEDIA_ROOT, file_name)
            
            if response.status_code == 200:
                with open(file_path, 'wb') as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                    print("file written")
            if os.path.exists(file_path):
                with open(file_path, 'rb') as fh:
                    response = HttpResponse(response.content, content_type="application/audio.webm")
                    response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                    return HttpResponse("file uploaded")
            raise Http404
            # ## Finally, you know this is multipart-type, and headers are okay, let store it! 
            # uploaded_file = request.FILES['audio'] # data from the request
            # if chunk_num == 0: 
            #     ## The very first chunk — create/overwrite a binary file
            #     with open(file_name, 'wb+') as f:
            #         f.write(uploaded_file.read()) # <—— so, just read it from the request!
            # else:
            #     ## Next chunks — append to the file!
            #     with open(file_name, 'ab') as f:
            #         f.write(uploaded_file.read())
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
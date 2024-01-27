from django.http import HttpResponse

def testing(request):
    print("Endpoint called!")
    return HttpResponse("Hello World!")
    
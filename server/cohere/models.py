# data managing from MVT
from django.http import JsonResponse
import cohere
import os

cohere_api_key = os.getenv("COHERE_API_KEY")

def cohere_example(request):
    cohere.api_key = os.getenv("COHERE_API_KEY")
    model = "baseline-shrimp"
    prompt = "Translate the following English text to French: {'text': 'Hello, world!'}"
    prediction = cohere.generate(model, prompt)
    return JsonResponse(prediction)

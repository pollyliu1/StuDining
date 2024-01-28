# all urls to route views, API calls from next.js land here
from django.urls import path
from .views import SummaryView

urlpatterns = [
  path('', SummaryView.as_view()),
  path('summary/', SummaryView())
]

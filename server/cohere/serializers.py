# formatting the data in such a way that it can be sent across to Next.js
from rest_framework import serializers
from .models import Summary


class FooterSerializer(serializers.ModelSerializer):
  class Meta:
    model = Footer
    fields = '__all__'
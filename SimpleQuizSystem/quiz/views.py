"""from django.shortcuts import render
from quiz.models import Exam 
# Create your views here.

def home(request):
    exam = Exam.objects.all()
    return render(request,"index.html",{"exam":exam})"""
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from .models import Exam

# Define a serializer for the Exam model
class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

def home(request):
    # Retrieve all Exam objects from the database
    exams = Exam.objects.all()

    # Serialize the Exam objects using the serializer
    serializer = ExamSerializer(exams, many=True)
    serialized_data = serializer.data

    # Return the serialized data as JSON response
    return JsonResponse({"exam": serialized_data}, safe=False)



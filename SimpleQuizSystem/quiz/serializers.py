from rest_framework import serializers
from quiz.models import Exam

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['Question', 'Option1', 'Option2', 'Option3', 'Option4', 'Corrans']

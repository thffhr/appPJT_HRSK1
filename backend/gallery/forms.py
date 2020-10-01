from django import forms
from .models import Menu

class MenuForm(forms.ModelForm):
    image = forms.FileField()
    class Meta:
        model = Menu
        fields = ['image']

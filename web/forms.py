from django import forms
from . import models

class AgregarPerro(forms.ModelForm):
    class Meta:
        model = models.Perro
        fields = '__all__'

class ModificarPerro(forms.ModelForm):
    class Meta:
        model = models.Perro
        fields = '__all__'
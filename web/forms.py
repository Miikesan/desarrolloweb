from django import forms
from . import models

class AgregarPerro(forms.ModelForm):
    class Meta:
        model = models.Perro
        fields = ['nombre','raza','descripcion','dueno','estado','foto']

class ModificarPerro(forms.ModelForm):
    class Meta:
        model = models.Perro
        fields = ['nombre','raza','descripcion','foto', 'estado', 'dueno']

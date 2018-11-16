from django.db import models
from django.urls import reverse
from cloudinary.models import CloudinaryField

class Estado(models.Model):
    descripcion = models.CharField(max_length=30)

    def __str__(self):
        return self.descripcion

class Perro(models.Model):
    nombre = models.CharField(max_length=100)
    foto = models.ImageField(default='default.png', blank=True)
    raza = models.CharField(default='Quiltro', max_length=100)
    descripcion = models.TextField()
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE, default=1)
    dueno = models.ForeignKey('auth.User', on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.nombre

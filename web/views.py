from django.contrib import messages
from django.shortcuts import render
from django.views.generic.edit import UpdateView
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404

from . import forms
from .models import Perro
from .models import Estado
from .forms import ModificarPerro

# Create your views here.

def list_perros(request):
    return render(request, 'web/list_perros.html', {})

def add_perro(request):
    return render(request, 'web/add_perro.html', {})

def home (request):
    perros = Perro.objects.all()
    adoptado = get_object_or_404(Estado, descripcion = 'adoptado')
    disponible = get_object_or_404(Estado, descripcion = 'disponible')
    rescatado = get_object_or_404(Estado, descripcion = 'rescatado')
    return render(request, 'home.html', {'perros': perros, 'adoptado':adoptado, 'disponible':disponible, 'rescatado':rescatado})

def contacto (request):
    return render(request, 'contacto.html')

def registro_perros(request):
    return render(request, 'web/registro_perros.html')

def lista_perros(request):
    if request.method == 'POST':
        filtro = request.POST.get('filtro')
        perros = Perro.objects.filter(estado__pk=filtro)
    else:
        perros = Perro.objects.all().order_by('nombre')
    
    adoptado = get_object_or_404(Estado, descripcion = 'adoptado')
    disponible = get_object_or_404(Estado, descripcion = 'disponible')
    rescatado = get_object_or_404(Estado, descripcion = 'rescatado')


    return render(request, 'lista_perros.html', {'perros' : perros, 'adoptado':adoptado, 'disponible':disponible, 'rescatado':rescatado})

@login_required(login_url="/accounts/login/")
def agregar_perro(request):
    if request.method == 'POST':
        form = forms.AgregarPerro(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('web:agregar_perro')
    else:
        form = forms.AgregarPerro()
    return render(request, 'agregar_perro.html', {'form':form})

@login_required(login_url="/accounts/login/")
def editar_perro(request, id=None):
    instance = get_object_or_404(Perro, id=id)
    form = ModificarPerro(request.POST or None, instance=instance)
    if form.is_valid():
        instance = form.save(commit=False)
        instance.save()
        return redirect('web:lista_perros')
    context = {
        "nombre":instance.nombre,
        "instance":instance,
        "form":form,
    }
    return render(request, 'editar_perro.html', context)

@login_required(login_url="/accounts/login/")
def adoptar_perro(request, id=None):
    estado = get_object_or_404(Estado, pk=1)
    perro = get_object_or_404(Perro, id=id)
    perro.estado = estado
    perro.dueno = request.user
    perro.save(update_fields=["estado"])
    perro.save(update_fields=["dueno"])
    return redirect('web:lista_perros')


@login_required(login_url="/accounts/login/")
def eliminar_perro(request, id=None):
    instance = get_object_or_404(Perro, id=id)
    instance.delete()
    return redirect('web:lista_perros')
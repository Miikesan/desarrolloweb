from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from .forms import SignUpForm

# Create your views here.

def register(request):
    if request.method == 'POST': #validamos que se haya submiteado algo
        form = SignUpForm(request.POST) # Se crea instancia del formulario con la informacion de POST
        if form.is_valid(): # validamos formulario
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('accounts:register_thanks')
    else:
        form = SignUpForm() # Se crea instancia vacia del formulario
    return render(request, 'accounts/register.html', {'form':form})

def login_account(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            # Se inicia sesion
            user = form.get_user()
            login(request, user)
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            else:
                return redirect('web:home')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form':form})

def logout_account(request):
    if request.method == 'POST':
        logout(request)
        return redirect('web:home')

def recover_password(request):
    return render(request, 'accounts/recuperar_pass.html')

def register_thanks(request):
    return render(request, 'accounts/register_thanks.html')
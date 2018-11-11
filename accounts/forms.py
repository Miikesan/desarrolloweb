from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, help_text='Requerido')
    last_name = forms.CharField(max_length=30, required=False, help_text='Opcional.')
    email = forms.EmailField(max_length=254, help_text='Requerido')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', )
    
    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.fields['first_name'].label = "Nombres"
        self.fields['last_name'].label = "Apellidos"
        


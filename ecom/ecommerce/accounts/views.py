from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import logout

def register_user(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()  # Save the user to the database
            return redirect('login')  # Redirect to login page
    else:
        form = UserCreationForm()
    
    return render(request, 'accounts/register.html', {'form': form})

def logout_user(request):
    logout(request)  # Log the user out
    return redirect('login')  # Redirect to the login page or any other page


from mysqlDB.queries import validate_pass
from mysqlDB.mutations import createEntry
from django.shortcuts import render
from django.http import HttpResponse

def login(request):
    if request.POST:
        clientEmail = request.POST["email"]
        clientPass = request.POST["password"]
        if validate_pass(clientPass,clientEmail):
            return HttpResponse("<h1>You have been logged in successfully")
        else:
            return HttpResponse("<h1>You could not be logged in!")
    else:
        return render(request, 'login_page/log_in_page.html')

def signup(request):
    if request.POST:
        clientEmail = request.POST["email"]
        clientPass = request.POST["password"]
        if createEntry(clientPass,clientEmail):
            return HttpResponse("<h1>You have been logged in successfully")
        else:
            return HttpResponse("<h1>You could not be signed in!")
    return render(request, 'login_page/sign_up_page.html')

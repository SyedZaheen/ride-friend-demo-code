from django.urls import path
from . import views

urlpatterns = [
    path('', views.signup, name='signuppage'),
    path('login/', views.login, name='loginpage')
]

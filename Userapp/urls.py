from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [ 
  
    

    path('register/',  RegisterView.as_view(), name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    

]
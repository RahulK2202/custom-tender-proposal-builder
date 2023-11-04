from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [ 
  
    

   path('tenders/', TenderListView.as_view(), name='tender-list'),
   path('proposals/<int:tender_id>/', ProposalCreateView.as_view(), name='proposal-create'),
   path('proposalsedit/<int:id>/',  ProposalEditView.as_view(), name='proposal-edit'),

 

]
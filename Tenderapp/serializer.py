from rest_framework import serializers
from .models import Tender,Proposal  
from Userapp.models import AppUsers

class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender  
        fields = "__all__" 

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = '__all__' 

class UserdataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUsers
        fields = '__all__' 


class PropSerializer(serializers.ModelSerializer):
    user=UserdataSerializer()
    tender=TenderSerializer()
    class Meta:
        model = Proposal
        fields = ["id","tender","user","financing","proposal_summary","submission_date"]
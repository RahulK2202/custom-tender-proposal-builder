from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tender,Proposal
from .serializer import TenderSerializer,ProposalSerializer,PropSerializer
from django.http import Http404 

class TenderListView(APIView):
    def get(self, request):
        data = Tender.objects.all()
        serializer = TenderSerializer(data, many=True)
        return Response(serializer.data)



class ProposalCreateView(APIView):

    def get_proposals(self, tender_id):
        try:
            return Proposal.objects.filter(tender_id=tender_id)  # Use filter to get all proposals for the given tender_id
        except Proposal.DoesNotExist:
            raise Http404
        
    def get(self, request, tender_id, format=None):
        proposals = self.get_proposals(tender_id)
        serializer = PropSerializer(proposals, many=True)  # Pass proposals as a list
        return Response(serializer.data)




    def post(self, request, tender_id, format=None):
    
  
        try:
            tender = Tender.objects.get(id=tender_id)
        except Tender.DoesNotExist:
            return Response({'detail': 'Tender not found'})

        serializer = ProposalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

 


    def delete(self, request,tender_id, format=None):
        
        data = Proposal.objects.get(id=tender_id)
        data.delete()
     
        return Response()
    
class ProposalEditView(APIView):
    def get(self,request,id):
        try:
            data=Proposal.objects.get(id=id)
        except Proposal.DoesNotExist:
            raise Http404
        serializer = PropSerializer(data)  
        return Response(serializer.data)
    
    def put(self, request, id, format=None):
        try:
            proposal = Proposal.objects.get(id=id)
        except Proposal.DoesNotExist:
            return Response()

        serializer = ProposalSerializer(proposal, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    

    








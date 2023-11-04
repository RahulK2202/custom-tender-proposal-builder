from django.db import models
from Userapp.models import AppUsers



class Tender(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    submission_deadline = models.DateTimeField()
    created_by = models.ForeignKey(AppUsers, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Proposal(models.Model):
    tender = models.ForeignKey(Tender, on_delete=models.CASCADE)
    user = models.ForeignKey(AppUsers, on_delete=models.CASCADE)
    financing = models.TextField()
    proposal_summary = models.TextField()
    submission_date = models.DateTimeField(auto_now_add=True)
    # Add other fields specific to proposals

    def __str__(self):
        return f"Proposal for {self.tender.title} by {self.user.username}"
    

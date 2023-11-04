import axios from 'axios';
import React, { useState } from 'react'
import { BACKEND_BASE_URL } from '../../API/api';

function ProposalList() {
    const [data,setData]=useState([])
    const [proposal,setProposal]=useState([])

const tender_id=data.id
console.log(tender_id,"got id");

    const fetchproposaldata=()=>{

        axios.get(`${BACKEND_BASE_URL}/tender/proposals/${tender_id}/`).then((res)=>{
    
            console.log(res.data,"proposal cominggg");
    
            setProposal(res.data,"coming propsoal")
        }).catch((error)=>
        {
    
            console.log(error);
        })
    }

    useEffect(() => {
        fetchproposaldata()
        
        }, [])
        

  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">ttttttttttttttttt</h2>
      <p className="text-gray-600 mb-2">Submission Date: ttttttttttttttttttttt</p>
      <p className="text-gray-600 mb-2">Created By: asfsasaafafasfafafaf</p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Financing:</h3>
        <p>4555555555</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Proposal Summary:</h3>
        <p>dsfsdfssdfsdfsdfdsdfsdfsdfsdfsdf</p>
      </div>

      <button
        onClick=""
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Generate PDF
      </button>
    </div>
    </div>
  )
}

export default ProposalList

import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect } from "react";
import { BACKEND_BASE_URL } from "../../API/api";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProposalList from "./ProposalList";
import AuthContext from "../../utils/AuthContext";
import toast from "react-hot-toast";
import Ab from "../pages/Ab.css";

function TenderList() {
  let { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [detail, setDetail] = useState(false);

  const fetchdata = () => {
    axios
      .get(`${BACKEND_BASE_URL}/tender/tenders/`)
      .then((res) => {
        console.log(res.data, "comingggg");
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteproposal = (id) => {
    axios
      .delete(`${BACKEND_BASE_URL}/tender/proposals/${id}/`)
      .then((res) => {
        toast.success("deleted successfully");
        fetchproposaldata();
      })
      .catch((error) => toast.error(error));
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    const draggedProposalId = e.dataTransfer.getData("text/plain");

    const draggedIndex = proposal.findIndex(
      (p) => p.id === Number(draggedProposalId)
    );
    const targetIndex = proposal.findIndex((p) => p.id === Number(id));

    const updatedProposal = [...proposal];
    const [draggedProposal] = updatedProposal.splice(draggedIndex, 1);
    updatedProposal.splice(targetIndex, 0, draggedProposal);
    setProposal(updatedProposal);
  };

  const fetchproposaldata = (id) => {
    setDetail(!detail);
    axios
      .get(`${BACKEND_BASE_URL}/tender/proposals/${id}/`)
      .then((res) => {
        console.log(res.data, "proposal cominggg");
        setProposal(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function generatePDF(proposal) {
    const pdfContent = `
      <h2>Proposal Details</h2>
      <p>Submission Date: ${new Date(
        proposal.submission_date
      ).toLocaleString()}</p>
      <p>Created By: ${proposal.user.username}</p>
      <h3>Financing:</h3>
      <p>${proposal.financing}</p>
      <h3>Proposal Summary:</h3>
      <p>${proposal.proposal_summary}</p>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Proposal PDF</title>
        </head>
        <body>
          ${pdfContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="overflow-y-hidden">
       <h2 className="text-2xl text-center font-bold mt-5">Tender Details</h2>
      {data.map((i, index) => (
        <div key={i.id} className="w-full h-full bg-blue-gray-400 p-2 m-2 ">
          <h1 className="pl-3">title name : {i.title}</h1>
          <h1 className="pl-3">description : {i.description}</h1>
          <h1 className="pl-3">
            Submission date: {new Date(i.submission_deadline).toLocaleString()}
          </h1>
          <div className="flex gap-4 mt-2">
            <Button onClick={() => navigate(`/proposal/${i.id}`)}>
              Add Proposal
            </Button>
            <Button className="" onClick={() => fetchproposaldata(i.id)}>
              View Details
            </Button>
          </div>
        </div>
      ))}

      {detail && (
        <div className="w-full h-full overflow-y-hidden">
          {proposal &&
            proposal.map((i, index) => (
              <div
                key={i.id}
                className="grid grid-cols-2 proposal-draggable"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, i.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, i.id)}
              >
                <div className="pdf-content p-4 bg-gray-100 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Proposal Details</h2>
                  <p className="text-gray-600 mb-2">
                    Submission Date:{" "}
                    {new Date(i.submission_date).toLocaleString()}
                  </p>
                  <p draggable="true"  className="text-gray-600 mb-2">
                    Created By: {i.user.username}
                  </p>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Financing:</h3>
                    <p>{i.financing}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Proposal Summary:</h3>
                    <p>{i.proposal_summary}</p>
                  </div>
                  <button
                    onClick={() => generatePDF(i)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover-bg-blue-600"
                  >
                    Generate PDF
                  </button>
                </div>

                {user && user.user_id === i.user.id && (
                  <div className="flex justify-end space-x-2  overflow-y-hidden pt-3  h-12 ">
                    <Button onClick={() => navigate(`/proposaledit/${i.id}`)}>
                      edit
                    </Button>
                    <Button onClick={() => deleteproposal(i.id)}>delete</Button>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TenderList;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../API/api";
import AuthContext from "../../utils/AuthContext";

function ProposalEdit() {
  const id = useParams();
  const tender_id = parseInt(id.id);
  const [proposal, setProposal] = useState([]);
let {user}=useContext(AuthContext)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    financing: "",
    proposal_summary: "",
    // tender: tender_id,

    user: user.user_id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData, "form data");
  const fetchproposaldata = () => {
    axios
      .get(`${BACKEND_BASE_URL}/tender/proposalsedit/${tender_id}/`)
      .then((res) => {
        console.log(res.data, "proposal cominggg");

        setFormData({
          ...formData,
          financing: res.data.financing,
          proposal_summary: res.data.proposal_summary,
        });
        // setProposal(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BACKEND_BASE_URL}/tender/proposalsedit/${tender_id}/`, formData)
      .then((res) => {
        console.log(res,"errorr");
        navigate("/userhome");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchproposaldata();
  }, []);

  return (
    <div>
      <div>
        <UserNavbar />

        <div className="w-full h-full flex justify-center">
          <form
            onSubmit={handlesubmit}
            className="mt-5 border border-black p-10 rounded-xl shadow-2xl"
          >
            <h1 className="text-3xl"> Porposal Details</h1>

            <div className="mt-4">
              <label htmlFor="finacing"> Enter the amount</label>
              <input
                className="ml-3 border rounded border-black"
                type="text"
                name="financing"
                value={formData.financing}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor=" proposal_summary"> Proposal Summary</label>
              <textarea
                className="ml-3 mt-4 border rounded border-black"
                type="text"
                name="proposal_summary"
                value={formData.proposal_summary}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center mt-4">
              <Button type="submit" color="green">
                {" "}
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProposalEdit;

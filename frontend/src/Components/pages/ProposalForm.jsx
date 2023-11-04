import React, { useContext, useState } from "react";
import UserNavbar from "./UserNavbar";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../API/api";
import toast from "react-hot-toast";
import AuthContext from "../../utils/AuthContext";

function ProposalForm() {
  const navigate = useNavigate();
  let { user } = useContext(AuthContext);

  const id = useParams();
  const tender_id= parseInt(id.id);
  console.log(id, "ggggg");

  const [formData, setFormData] = useState({

    tender: tender_id,

    user: user.user_id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData, "passing data");

  const handlesubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${BACKEND_BASE_URL}/tender/proposals/${tender_id}/`, formData)
      .then((res) => {
        console.log(res.data, "comingggg");

        toast.success("submitted sucessfully");
        navigate("/userhome");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor=" proposal_summary"> Proposal Summary</label>
            <textarea
              className="ml-3 mt-4 border rounded border-black"
              type="text"
              name="proposal_summary"
              value={formData.name}
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
  );
}

export default ProposalForm;

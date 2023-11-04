import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import UserHome from "./Components/pages/UserHome";
import { AuthProvider } from "./utils/AuthContext";
import ProposalForm from "./Components/pages/ProposalForm";
import ProposalList from "./Components/pages/ProposalList";
import ProposalEdit from "./Components/pages/ProposalEdit";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      
      <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userhome" element={<PrivateRoute><UserHome/></PrivateRoute>} />
          <Route path="/proposal/:id" element={<PrivateRoute><ProposalForm/></PrivateRoute>} />
          <Route path="/proposaledit/:id" element={<PrivateRoute><ProposalEdit/></PrivateRoute>} />
          <Route path="/proposallist" element={<PrivateRoute><ProposalList /></PrivateRoute>} />
        </Routes>

       


        </AuthProvider>
      </Router>
     
    </div>
  );
}

export default App;

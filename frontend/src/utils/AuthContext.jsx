import React, { createContext, useState } from 'react'
import { BACKEND_BASE_URL } from '../API/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';



const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

    const navigate = useNavigate()
    let loginUser = async (loginData) => {

        await axios
                    .post(`${BACKEND_BASE_URL}/token/`, loginData)
                    .then((res)=>{
                        console.log(res,"ggggg");
                        setAuthTokens(res.data)
                        localStorage.setItem('authTokens', JSON.stringify(res.data.access));
                        setUser(jwtDecode(res.data.access))
                       
                        navigate('/userhome')
                        toast.success("Login succes")
                            
                       
                        // else {

                        //     navigate('/userhome')
                        //     toast.success("Login succes")
                        // }

                            

                    })
                    .catch((error)=>{
                        console.log(error);
                        toast.error("Something Went Wrong Please Try again")
                    })
        
    }

    let logoutUser = (e) => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        toast.success("logout succesfully")
        navigate('/')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
import React, { useContext } from 'react'
import AuthContext from '../../utils/AuthContext';
import { useFormik } from 'formik';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { loginSchema } from '../../Validations/FormValidation';
import reg from "../../images/reg.jpg"


function Login() {

 
  

  let {loginUser} = useContext(AuthContext)
    const initialValues = {
      email: "",
      password: "",
    };
  
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
          loginUser(values);
        },
      });

 


  return (
    <div>
      <div>
      <div className="w-screen h-full  md:h-screen flex justify-center items-center bg-blue-100 ">
        <div className=" w-4/5 h-full md:h-4/5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-2xl rounded-xl">
          <div className="w-full h-full bg-white  flex justify-center items-center">
            <div className=" w-4/5 h-4/5">
              <img
                className="w-full h-full"
                src={ reg}
                alt=""
              />
            </div>
          </div>
          <div className="md:pt-16">
            <div className=" flex flex-col justify-center px-5 lg:px-10 w-full h-full md:w-11/12 md:h-4/5">
              <h1 className=" text-2xl font-bold ">Welcome Back </h1>
              <p className=" pt-5">
                To keep connected with us please login with your personal
                information by email address and password
              </p>
              <form className=" w-full h-60 mt-10" onSubmit={handleSubmit}>
                <div className="mb-4 ">
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    className="w-full p-3 rounded-lg border border-black text-black "
                    placeholder="Enter Your Email Address"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className=" text-red-400 text-sm "> {errors.email} </p>
                  ) : null}
                </div>
                <div className="mb-4 relative">
                  <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    className="w-full p-3 rounded-lg border border-black text-black "
                    placeholder="Enter Password"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className=" text-red-400 text-sm"> {errors.password} </p>
                  ) : null}
                
                </div>

                <Button color="green" type="submit" className="my-5 ">
                  Login
                </Button>
              </form>
              <div className="flex mb-6">
                <p className="mr-5 mt-4">Don't have an account ? </p>
                <Link to="/register">
                  <Button>Sign Up </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login

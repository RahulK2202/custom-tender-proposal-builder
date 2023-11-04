import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../API/api";
import { signupSchema } from "../../Validations/FormValidation";
import toast from "react-hot-toast";
import reg from "../../images/reg.jpg";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        setShowSpinner(true);
        axios
          .post(`${BACKEND_BASE_URL}/register/`, values)
          .then((res) => {
            console.log(res, "datsssssss");
            toast.success("Registration success");
            setShowSpinner(false);
            navigate("/");
          })
          .catch((error) => {
            setShowSpinner(false);
            toast.error("User Already Exists");
          });
      },
    });

  return (
    <div>
      <div>
        {showSpinner && (
          <div className=" fixed top-0 left-0 z-50 w-screen h-screen flex flex-col justify-center items-center  bg-white">
            <h1 className="text-4xl font-serif font-black py-10">
              You Are On The Way
            </h1>
            <img
              className="w-60 h-60 object-cover"
              // src="/src/images/registration_loading.gif"
              alt=""
            />
          </div>
        )}

        <div className="w-screen h-full md:h-screen flex justify-center items-center bg-blue-100 ">
          <div className=" w-4/5 h-full md:h-4/5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-2xl rounded-xl">
            <div className="w-full h-full flex justify-center mt-2">
              <div className="w-4/5 h-4/5">
                <img className="w-full h-full" src={reg} alt="" />
              </div>
            </div>
            <div className="md:pt-16">
              <div className=" flex flex-col justify-center px-5 lg:px-10 w-full h-full md:w-11/12 md:h-4/5">
                <h1 className=" text-2xl font-bold ">Create Account </h1>

                <form className=" w-full h-full mt-4" onSubmit={handleSubmit}>
                  <div className="mb-4 relative">
                    <input
                      name="username"
                      type="text"
                      autoComplete="off"
                      className="w-full p-2 rounded-lg border border-black text-black "
                      placeholder="Username"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.username && touched.username ? (
                      <p className=" text-red-400 absolute top-3 right-3">
                        {errors.username}
                      </p>
                    ) : null}
                  </div>
                  <div className="mb-4 relative">
                    <input
                      name="email"
                      type="email"
                      autoComplete="off"
                      className="w-full p-2 rounded-lg border border-black text-black "
                      placeholder="Email Address"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className=" text-red-400  absolute top-3 right-3">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-4 relative">
                    <input
                      name="phone_number"
                      type="text"
                      autoComplete="off"
                      className="w-full p-2 rounded-lg border border-black text-black "
                      placeholder="Phone_number"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone_number && touched.phone_number ? (
                      <p className=" text-red-400  absolute top-3 right-3">
                        {errors.phone_number}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-4 relative">
                    <input
                      name="password"
                      type="password"
                      autoComplete="off"
                      className="w-full p-2 rounded-lg border border-black text-black "
                      placeholder="Password"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className=" text-red-400  absolute top-3 right-3">
                        {errors.password}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-4 relative">
                    <input
                      name="confirm_password"
                      type="password"
                      autoComplete="off"
                      className="w-full p-2 rounded-lg border border-black text-black "
                      placeholder="Confirm Password"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <p className=" text-red-400  absolute top-3 right-3">
                        {errors.confirm_password}
                      </p>
                    ) : null}
                  </div>

                  <Button color="green" type="submit" className="my-5 ">
                    Sign Up
                  </Button>
                </form>
                <div className="flex items-center">
                  <p className="mr-5">Already have an account ? </p>
                  <Link className="" to="/">
                    <Button>Login</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { UilExclamationTriangle, UilFidgetSpinner } from '@iconscout/react-unicons';
import { useState, useEffect } from "react";
import "./App.css";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let Login = () => {
  const Schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  let [userType, setUserType] = useState(null);
  let [loginError, setloginError] = useState(false);
  let [bannedError, setBannedError] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  
  let onSubmit = (data) => {
    setIsLoading(true)
    fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        let data = await res.json();
        if (data.err) {
          res.status === 403 ? setBannedError(true) : setloginError(true);
          return;
        }
        localStorage.setItem("jwt", data.token);
        setUserType(data.type);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        reset();
        setIsLoading(false)
      });
  };

  let data;
  useEffect(() => {
    fetch("/api/verifyJWT", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(async (res) => {
        data = await res.json();
        if (data.client) setUserType("client");
        else if (data.agent) setUserType("agent");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (userType === "client") {
    return <Navigate to={"/"} />;
  } else if (userType === "agent") {
    return <Navigate to={"/admin"} />;
  } else
    return (
      <>
        <div className="flex bg-indigo-200 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {bannedError ? (
            <div className="w-1/2 h-2/4 flex flex-col items-center justify-center bg-white rounded-lg py-6">
              <h1 className="text-3xl font-bold text-red-500">Banned</h1>
              <div className="bg-white rounded-lg py-6 text-black font-bold text-lg text-center">
                <p>
                  We are sorry to inform you that you were banned by an
                  administrator.
                </p>
                <p>
                  Please{" "}
                  <a
                    className="underline hover:cursor-pointer hover:text-blue-800"
                    href="mailto:recipient@example.com?subject=Subject&body=Body"
                  >
                    contact us{" "}
                  </a>
                  for more information
                </p>
                <p>or</p>
                <button
                  className="btn px-3 hover:text-white hover:bg-emerald-500"
                  onClick={() => {
                    setBannedError(false) && setloginError(false);
                  }}
                >
                  Go back to login page
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {
                  !loginError 
                ?
                  <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                :
                  <UilExclamationTriangle className="mx-auto h-10 w-auto text-red-500" />
                }
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${loginError?"text-red-500 text-base":"text-slate-700"}`}>
                  {loginError? "Incorrect email and/or Password" :"Sign in to your account"}
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-slate-700"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-4 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                        {...register('email')}
                      />
                    </div>
                    <small className="text-red-600 font-medium">{errors.email?.message}</small>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-4 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                        {...register('password')}
                        />
                    </div>
                    <small className="text-red-600 font-medium">{errors.password?.message}</small>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    {
                      isLoading ?
                        <UilFidgetSpinner className="animate-spin h-5 w-5 text-white" />
                      :
                        "Sign in"
                    }
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </>
    );
};

export default Login;

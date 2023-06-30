import { useState, useEffect } from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

let Login = () => {

    const Schema = yup.object().shape({
       email: yup.string().email().required(),
       password: yup.string().min(4).max(20).required(),
    });
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(Schema)
    });

    let [userType, setUserType] = useState(null);
    let [loginError, setloginError] = useState(false);
    let [bannedError, setBannedError] = useState(false);
    
    let onSubmit = (data) => {
        fetch('/api/user/login',{
            method: "post",
            body:JSON.stringify({
                email : data.email,
                password : data.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res)=>{
            let data = await res.json();
            if(data.err)
            {
                res.status === 403 ? setBannedError(true) : setloginError(true);
                return;
            }
            localStorage.setItem('jwt',data.token);
            setUserType(data.type);
        })
        .catch(err=>{
            console.error(err);
        }).finally(()=>{
            reset();
        })
    }
    
    let data;
    useEffect(()=>{
        fetch("/api/verifyJWT",{
            method:"post",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(async(res)=>{
            data = await res.json();
            if(data.client)
                setUserType("client");
            else if (data.agent)
                setUserType("agent")
        }).catch(err=>{
            console.error(err);
        });
    },[]);


    if(userType === "client")
    {
        return (
            <Navigate to={'/'} />
        );
    }
    else if( userType === "agent")
    {
        return (
            <Navigate to={"/admin"} />
        );
    }
    else
        return(
            <>
                <div className='h-full w-full flex flex-col justify-center items-center bg-slate-600'>
                    {
                        bannedError ? 
                            <div className='w-1/2 h-2/4 flex flex-col items-center justify-center bg-white rounded-lg py-6'>
                                <h1 className='text-3xl font-bold text-red-500'>Banned</h1>
                                <div className='bg-white rounded-lg py-6 text-black font-bold text-lg text-center'>
                                    <p>We are sorry to inform you that you were banned by an administrator.</p>
                                    <p>Please <a className="underline hover:cursor-pointer hover:text-blue-800" href="mailto:recipient@example.com?subject=Subject&body=Body">contact us </a>
                                    for more information</p>
                                    <p>or</p>
                                    <button className='btn px-3 hover:text-white hover:bg-emerald-500'
                                        onClick={()=>{setBannedError(false) && setloginError(false)}}
                                    >
                                        Go back to login page
                                    </button>
                                </div>
                            </div>
                        :
                        <form className=' min-w-fit w-1/2 flex flex-col gap-3 items-center bg-white rounded-lg py-6 '
                        onSubmit={handleSubmit(onSubmit)}
                        >
                            <h1 className=' text-3xl font-normal '>Login</h1>
                            {
                                loginError && <small className="text-red-600 font-medium">Incorrect email and/or Password</small>
                            }
                            <input
                                type="text"
                                placeholder="email address"
                                className="border-2 border-black rounded-full w-2/4 h-10 text-center"
                                {...register('email')}
                            />
                            <small className="text-red-600 font-medium">{errors.email?.message}</small>
                            <input
                                type='password'
                                placeholder='password'
                                className="border-2 border-black rounded-full w-2/4 h-10 text-center"
                                {...register('password')}
                            />
                            <small className="text-red-600 font-medium">{errors.password?.message}</small>
                            <button className='border-2 border-black rounded-full py-2 px-10 text-center hover:bg-indigo-300 hover:text-rose-600 hover:font-bold'
                            type='submit'
                            >
                                Sign In
                            </button>
                        </form>
                    }
                    
                </div>
            </>
        );
}

export default Login;
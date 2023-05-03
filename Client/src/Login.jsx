import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { Navigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';

let Login = () => {

    const Schema = yup.object().shape({
       email: yup.string().email().required(),
       password: yup.string().min(4).max(20).required(),
    });
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(Schema)
    });

    let [userType, setUserType] = useState(null);
    let [loginError, setloginError] = useState(false);
    
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
                setloginError(true);
                return;
            }
            localStorage.setItem('jwt',data.token);
            Cookies.set('userType', data.type, {expires: 1});
            setUserType(data.type);
        })
        .catch(err=>{
            console.error(err);
        })
    }
    

    useEffect(()=>{
        let type = Cookies.get('userType');
        setUserType(type);
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
                </div>
            </>
        );
}

export default Login;
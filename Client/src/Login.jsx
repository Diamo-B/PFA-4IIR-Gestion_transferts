import { useRef, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { Navigate } from 'react-router-dom';

let Login = () => {
    let email = useRef();
    let password = useRef();
    let [userType, setUserType] = useState(null);

    useEffect(()=>{
        let type = Cookies.get('userType');
        setUserType(type);
    },[]);
    
    let login = () => {
        fetch('/api/user/login',{
            method: "post",
            body:JSON.stringify({
                email : email.current.value,
                password : password.current.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res)=>{
            let data = await res.json();
            localStorage.setItem('jwt',data.token);
            Cookies.set('userType', data.type, {expires: 1});
            setUserType(data.type);
        })
        .catch(err=>{
            console.error(err);
        })
    }

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
                    <div className=' min-w-fit w-1/2 flex flex-col gap-3 items-center bg-white rounded-lg py-6 '>
                        <h1 className=' text-3xl font-normal '>Login</h1>
                        <input
                            ref={email}
                            type="email"
                            placeholder="email address"
                            className="border-2 border-black rounded-full w-2/4 h-10 text-center"
                        />
                        <input
                            ref={password}
                            type='password'
                            placeholder='password'
                            className="border-2 border-black rounded-full w-2/4 h-10 text-center"
                        />
                        <button className='border-2 border-black rounded-full py-2 px-10 text-center hover:bg-indigo-300 hover:text-rose-600 hover:font-bold'
                        onClick={login}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </>
        );
}

export default Login;
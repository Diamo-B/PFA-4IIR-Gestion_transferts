import { Outlet,Navigate, Link } from "react-router-dom"
import { useEffect, useState } from "react";

export function ClientAuthOutlet() {
  let [userType, setUserType] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    let checkUser = () => {
    fetch("/api/verifyJWT",{
        method:"post",
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(async(res)=>{
        let data = await res.json();
        if(data.client)
            setUserType("client");
        else if (data.agent)
            setUserType("agent")
    }).catch(err=>{
        console.error(err);
    }).finally(() => {
      setIsLoading(false);
    });
    }
    checkUser();
  },[]);
  return (
    <>
    {
      !isLoading &&
      (
        userType == null?
            <Navigate to="/login" />
        :
        (
          userType === 'client' ?
            <Outlet />
          : 
          <>
            <p>No Permission</p>
            <Link to='/admin' className='block w-full h-full'>
              Go to home
            </Link>
          </>
        )
      )
    }
    </>
  )
}
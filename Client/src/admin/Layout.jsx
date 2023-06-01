import { useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import {setUser} from '../Redux/auth';

const AdminLayout = ({children}) => {
  
  let dispatch = useDispatch();

  useEffect(()=>{
    fetch("/api/verifyJWT",{
      method: 'post',
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(async (res)=>{
      let data = await res.json();
      dispatch(setUser(data));
    }).catch(err=>{
      console.error(err);
    })
  },[])
  
  let currentUser = useSelector(state => state.authUser.value);

  return (
    <div className="w-full h-full bg-indigo-200 dark:bg-gray-900 text-white">
        <div className="w-full h-full flex">
          <Navbar currentUser={currentUser}/>
          <div className="flex-1 py-3">
            {
              children
            }
          </div>
        </div>
    </div>
  );
};

export default AdminLayout;

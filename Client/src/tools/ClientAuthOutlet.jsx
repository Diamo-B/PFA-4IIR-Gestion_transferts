import { Outlet,Navigate } from "react-router-dom"
import Cookies from "js-cookie";

export function ClientAuthOutlet() {
    let type = Cookies.get('userType');
  return (
    <>
      {
        !type ?
            <Navigate to="/login" />
        :
        (
          type === 'client' ?
            <Outlet />
          : 
            <p>No Permission</p>
        )
      }
      
    </>
  )
}
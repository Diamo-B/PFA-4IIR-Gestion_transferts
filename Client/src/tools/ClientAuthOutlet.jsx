import { Outlet,Navigate, Link } from "react-router-dom"
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
          <>
            <p>No Permission</p>
            <Link to='/admin' className='block w-full h-full'>
              Go to home
            </Link>
          </>
        )
      }
      
    </>
  )
}
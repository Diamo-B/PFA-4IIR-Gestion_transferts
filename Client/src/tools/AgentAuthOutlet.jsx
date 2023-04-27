import { Outlet, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export function AgentAuthOutlet() {
  let type = Cookies.get("userType");
  return (
    <>
      {!type ? (
        <Navigate to="/login" />
      ) : type === "agent" ? (
        <Outlet />
      ) : (
        <>
          <p>No Permission</p>
          <Link to='/' className='block w-full h-full'>
            Go to home
          </Link>
        </>
      )}
    </>
  );
}

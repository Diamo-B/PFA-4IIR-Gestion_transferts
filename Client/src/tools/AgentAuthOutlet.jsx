import { Outlet, Navigate } from "react-router-dom";
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
        <p>No Permission</p>
      )}
    </>
  );
}

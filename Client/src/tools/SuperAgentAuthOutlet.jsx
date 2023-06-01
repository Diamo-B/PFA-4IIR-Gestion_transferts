import { Outlet, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function SuperAgentAuthOutlet() {
    let [userType, setUserType] = useState(null);
    let [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch("/api/verifyJWT", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
            .then(async (res) => {
                let data = await res.json();
                if (data.client) setUserType("client");
                else if (data.agent.isSuperAdmin == false) setUserType("agent");
                else if (data.agent.isSuperAdmin == true) setUserType("superAgent")
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <>
        {!isLoading && (
          <>
            {userType === null ? (
              <Navigate to="/login" />
            ) : userType === "superAgent" ? (
              <Outlet />
            ) : userType === "agent" ? (
              <>
                <p>No Permission</p>
                <Link to="/admin" className="block w-full h-full">
                  Go to home
                </Link>
              </>
            ) : userType === "client" ? (
              <>
                <p>No Permission</p>
                <Link to="/" className="block w-full h-full">
                  Go to home
                </Link>
              </>
            ) : null}
          </>
        )}
      </>
    );
}

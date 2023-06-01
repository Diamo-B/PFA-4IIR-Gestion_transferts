import { Outlet, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function AgentAuthOutlet() {
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
                else if (data.agent) setUserType("agent");
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
        {
          !isLoading && 
          (
            !userType ? 
            (
              <Navigate to="/login" />
            ) 
            :
            userType === "agent" ? 
            (
              <Outlet />
            ) 
            : 
            (
              <>
                  <p>No Permission</p>
                  <Link to="/" className="block w-full h-full">
                      Go to home
                  </Link>
              </>
            )
          )
        }
        </>
    );
}

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const RequireAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/auth",
          {},
          { withCredentials: true }
        );
        if (data.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    window.location.href = "http://localhost:5173/signup";
    return null;
  }

  return <Outlet />;
};

export default RequireAuth;

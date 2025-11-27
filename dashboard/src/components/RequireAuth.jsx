import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const RequireAuth = () => {
   const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      console.log("RequireAuth: Starting user verification...");
      try {
        console.log("RequireAuth: Sending request to", `${import.meta.env.VITE_BACKEND_URL}/auth`);
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth`,
          {},
          { withCredentials: true }
        );
        console.log("RequireAuth: Response received:", data);
        if (data.status) {
          console.log("RequireAuth: User is authenticated");
          setIsAuthenticated(true);
        } else {
          console.log("RequireAuth: User is NOT authenticated");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log("RequireAuth: Verification request failed:", err);
        setIsAuthenticated(false);
      } finally {
        console.log("RequireAuth: Loading set to false");
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // 1️⃣ Don't redirect until loading is fully done
  if (loading) return <div>Loading...</div>;

  if (isAuthenticated===false) {
      console.log("USER NOT AUTHENTICATED — showing dashboard anyway (TEMP MODE)");
    // window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/signup`;
    // return null;
  }

  return <Outlet />;
};

export default RequireAuth;

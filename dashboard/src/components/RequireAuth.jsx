import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const RequireAuth = () => {
   const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth`,
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
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // 1️⃣ Don't redirect until loading is fully done
  if (loading) return <div>Loading...</div>;

  if (isAuthenticated===false) {
    window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/signup`;
    return null;
  }

  return <Outlet />;
};

export default RequireAuth;

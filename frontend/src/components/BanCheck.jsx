import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const BanCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/isBanned/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          if (data) {
            await logout();
            window.location.reload();
            navigate('/');
          }
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, location.pathname]);

  return null
}

export default BanCheck;
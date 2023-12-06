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

  //use effect that fetches if a user is banned or not from the api
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/isBanned/${user.id}`);
        const data = await response.json();
        //if a user isbanned returns data that means they are banned
        if (response.ok) {
          if (data) {
            //logout the user and reload the page and take them to the landing pagge
            await logout();
            window.location.reload();
            navigate('/');
          }
        //error handling
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    //get the user data
    fetchData();
  }, [user, location.pathname]);

  return null
}

export default BanCheck;
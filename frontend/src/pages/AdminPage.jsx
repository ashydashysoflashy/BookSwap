import { React, useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminContent from "../components/Admin/AdminContent";


const AdminPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();
  const [adminFetched, setAdminFetched] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/isAdmin/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setAdmin(data);
          setAdminFetched(true)
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
  }, [user]);

  useEffect(() => {
    if (!adminFetched) return;
    if (admin) return;
    navigate("/")
  }, [admin, adminFetched, navigate])

  return (
    <div className="admin_page">
      {adminFetched && <AdminSidebar admin={admin} />}
      {adminFetched && <AdminContent admin={admin} />}
    </div>
  )
}

export default AdminPage;
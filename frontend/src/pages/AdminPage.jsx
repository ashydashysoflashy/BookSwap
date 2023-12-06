// Importing necessary React hooks and components
import { React, useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminContent from "../components/Admin/AdminContent";


const AdminPage = () => {
  // Extracting the user object from authentication
  const { user } = useAuthContext();
  const navigate = useNavigate()
  // State to track if admin data has been fetched
  const [adminFetched, setAdminFetched] = useState(false)
  // State variables for error handling, loading status, and admin status
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [admin, setAdmin] = useState()

  // useEffect hook to fetch admin data once there are user changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching admin status from the server using the user's ID
        const response = await fetch(`http://localhost:4000/api/user/isAdmin/${user.id}`);
        const data = await response.json();
        // If the response is okay, update the admin state
        if (response.ok) {
          setAdmin(data);
          setAdminFetched(true)
        } else {
          // If not okay, throw an error
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        // Error handling
        setError(err.message);
      } finally {
        // Set loading state to false after the fetch operation is complete
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // useEffect hook for redirecting non-admin users
  useEffect(() => {
    // Return early if admin data hasn't been fetched yet
    if (!adminFetched) return;
    // If the user is not an admin, navigate to home page
    if (admin) return;
    navigate("/")
  }, [admin, adminFetched, navigate])

  // Rendering the admin page (with adminFetched)
  return (
    <div className="admin_page">
      {adminFetched && <AdminSidebar admin={admin} />}
      {adminFetched && <AdminContent admin={admin} />}
    </div>
  )
}
// Export component
export default AdminPage;
//import the auth context
import { useAuthContext} from "./useAuthContext"
import { Link, useNavigate } from "react-router-dom";

//function to handle logout request 
export const useLogout = () => {
    const navigate = useNavigate()
    //dispatch to modify context
    const {dispatch} = useAuthContext()
    //function to logout the user
    const logout = async () => {
        //remove user from local storage
        localStorage.removeItem('user')
        //remove user from auth context and redirect to home page
        dispatch({type:'LOGOUT'})
        navigate('/');
    }

    //return the logout function
    return {logout}

}
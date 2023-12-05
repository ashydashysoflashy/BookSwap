//import the auth context
import { useAuthContext} from "./useAuthContext"
import { Link, useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate()
    //dispatch to modify context
    const {dispatch} = useAuthContext()
    //function to logout the user
    const logout = async () => {
        //remove user from local storage
        localStorage.removeItem('user')
        //remove user from auth context
        dispatch({type:'LOGOUT'})
        navigate('/');
    }

    //return the logout function
    return {logout}

}
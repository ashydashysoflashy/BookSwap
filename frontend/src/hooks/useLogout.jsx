//import the auth context
import { useAuthContext} from "./useAuthContext"

export const useLogout = () => {
    //dispatch to modify context
    const {dispatch} = useAuthContext()
    //function to logout the user
    const logout = async () => {
        //remove user from local storage
        localStorage.removeItem('user')
        //remove user from auth context
        dispatch({type:'LOGOUT'})
    }

    //return the logout function
    return {logout}

}
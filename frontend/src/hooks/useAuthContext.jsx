import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//function to only allow components wrapped in state provider to use state
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context;
}
import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

//function to handle api request for user login
export const useLogin = () => {
    //state for loading
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)
    //get the context modifying dispatch
    const {dispatch} = useAuthContext()

    //function to signup
    const login = async (email,password) => {
        //initially no error and loading true
        setLoading(true)
        setError(null)

        //object for userdetails to send to api
        const userDetails = {email,password};
        //call the api
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
              'Content-type': 'application/json'
            }
          });
        //get the response from the api 
        const json = await response.json();
        //if there was an error
        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        //if response ok update auth context and store the json web token somewhere
        if (response.ok) {
            //save the user and token to local storage so if user closes browser and reopens it they r still logged in
            localStorage.setItem('user',JSON.stringify(json))
            //update the auth context
            dispatch({type:'LOGIN',payload: json})
            //set loading to false
            setLoading(false)
        }
    }

    //return the signup function so we can use it and loading and error
    return {login, loading, error}
}
import { createContext, useReducer } from "react";

//export the context
export const AuthContext = createContext();

//reducer handles what to do when login and signing up since we have to update global context
export const authReducer = (state, action) => {
  switch (action.type) {
    //when logging in update the global state to have the user
    case 'LOGIN':
      return {
        user: action.payload
      }
    //when logging out update the global context to remove the user by setting them to null
    case 'LOGOUT':
      return {
        user: null
      }
    //default case (no case) dont change state and just return it
    default:
      return state
  }
}

//the provider is what we wrap the index.js app component in so every component can see this global state
export const AuthContextProvider = ({ children }) => {
  //initially user is null
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  console.log('AuthContext state:',state)

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}
import { createContext, useReducer } from "react";

export const AdsContext = createContext();

//reducer handles the different actions to update ad state
//involves posting ads, deleting ads, setting ads state, etc
export const adsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADS':
      return {
        ads: action.payload
      }
    case 'CREATE_AD':
      return {
        ads: [action.payload, ...(state.ads || [])]
      }
    case 'DELETE_AD':
      return {
        ads: (state.ads || []).filter((ad) => ad._id !== action.payload._id)
      }
    default:
      return state
  }
}
//provider to use the reducer and give access to other functions to the dispatch (the reducer) and state
//app.js is wrapped in a provider so the entire project has access to global state
export const AdsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adsReducer, {
    ads: null
  });

  return (
    <AdsContext.Provider value={{...state, dispatch}}>
      { children }
    </AdsContext.Provider>
  )
}
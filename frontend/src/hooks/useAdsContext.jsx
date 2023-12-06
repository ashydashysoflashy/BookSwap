import { useContext } from "react";
import { AdsContext } from "../context/AdContext";

//function to only allow components wrapped in state provider to use state
export const useAdsContext = () => {
    const context = useContext(AdsContext);

    if (!context) {
        throw Error('useAdsContext must be used inside an AdsContextProvider')
    }

    return context;
}
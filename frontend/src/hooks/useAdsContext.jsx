import { useContext } from "react";
import { AdsContext } from "../context/AdContext";

export const useAdsContext = () => {
    const context = useContext(AdsContext);

    if (!context) {
        throw Error('useAdsContext must be used inside an AdsContextProvider')
    }

    return context;
}
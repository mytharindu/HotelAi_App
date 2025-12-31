import { useEffect, useState } from "react";

export function useURLState(key, defaultValue){
    const [value, setValue] = useState(()=>{
        const params = new URLSearchParams(window.location.search);
        const paramValue = params.get(key);
        return paramValue !== null ? paramValue : defaultValue;
    });

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        if(value !== defaultValue && value !== ""){
            params.set(key, value);
        } else {
            params.delete(key);
        }
        const newURL = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname;
        window.history.replaceState({}, '', newURL);
    }, [key, value, defaultValue]);

    return [value, setValue];
}
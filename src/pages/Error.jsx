import { useEffect } from "react";

export default function Error(){
    useEffect(() => {
        localStorage.removeItem('__ingenuiti_ihg-nhop_lang');
        // window.location.reload();
    }, []);
}
import { useEffect, useState } from "react";
import getDefaultLanguage from "../../../assets/js/getDefaultLanguage";
import { closeLanguageSelectionModal } from "../../../assets/js/languageSelectionModal";
import "./modal.css";
import { useOutletContext } from "react-router-dom";

export default function LanguageSelection () {
    const [languages, setLanguages] = useState({});
    // ON LOAD GET THE PROPERTIES JSON TO GET THE LANGUAGES

    const loaderData = useOutletContext();

    useEffect(() => {
        window.scrollTo(0, 0)
        const propertiesData = loaderData.propertiesData;
        setLanguages(propertiesData["localization-settings"]["available-languages"]);

        localStorage.setItem('__ingenuiti_ihg-nhop_defaultLang', JSON.stringify(getDefaultLanguage(propertiesData["localization-settings"])));
    },[loaderData]);
    
    // LANGUAGE SELECTION LOGIC
    function onChangeLanguage(e, lang){
        if(localStorage.getItem('__ingenuiti_ihg-nhop_lang') !== lang){
            localStorage.setItem('__ingenuiti_ihg-nhop_lang',JSON.stringify(lang));
            window.location.reload();
        } else {
            closeLanguageSelectionModal();
        }
    }

    return (
    <>
        <div className="modal-backdrop rtl:text-left rtl:pl-20 text-right pr-20  ">
            <button className="md:text-5xl sm:text-2xl modal-close-btn text-gray-400 fixed mr-6 mt-5" onClick={closeLanguageSelectionModal}>X</button>
        </div>
        <div className="modal" id="languageSelectionModal">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 languages-to-select">
                {
                    Object.keys(languages).map(key => (
                        <div className={`xl:text-4xl 
                        ${key}
                        lg:text-3xl 
                        md:text-4xl 
                        sm:text-8xl 
                        my-4 
                        text-white 
                        underline 
                        text-left 
                        overflow-wrap-break-word 
                        cursor-pointer`} 
                        onClick={(e) => onChangeLanguage(e, {...languages[key], code: key})} key={key} >
                            {languages[key].name}
                        </div>
                    ))
                }
            </div>
        </div>
    </>)
}
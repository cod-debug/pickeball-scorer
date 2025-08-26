import { useEffect, useState } from 'react';
import LogoImg from '../../assets/images/logo.png';
import { showLanguageSelectionModal } from '../../assets/js/languageSelectionModal.js';
import LanguageSelectionModal from '../Modals/LanguageSelectionModal/LanguageSelectionModal.jsx';
import BackIcon from "../Icons/Back.jsx";
import { Link, useOutletContext } from 'react-router-dom';

export const NavBar = (props) => {
    const lang = localStorage.getItem('__ingenuiti_ihg-nhop_lang') 
        ? JSON.parse(localStorage.getItem('__ingenuiti_ihg-nhop_lang')) 
            :  JSON.parse(localStorage.getItem('__ingenuiti_ihg-nhop_defaultLang')) 
            ? JSON.parse(localStorage.getItem('__ingenuiti_ihg-nhop_defaultLang')) 
        : 'NO LANGUAGE';

    const [localizationEnabled, setLocalizationEnabled] = useState(true);
    const loaderData = useOutletContext();

    useEffect(() => {
        setLocalizationEnabled(loaderData.propertiesData['localization-enabled']);
    }, [loaderData]);

    function BackButton(){
        return (
            props.backLink
            ?
                <div className='text-white'>
                    <Link to={props.backLink} className="flex">
                        <BackIcon />
                        &nbsp;
                        {props.backText}
                    </Link>
                </div>
            : <></>
        )
    }
    return (
        <>
            <LanguageSelectionModal />
            <nav className="bg-primary border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50 shadow-md">
                <div className="container mx-auto py-3 px-6 flex justify-between">
                <Link to='/' className="flex items-center">
                    <img src={LogoImg} className="h-12" alt="IHG Logo" />
                </Link>
                {
                    localizationEnabled
                    ?
                    <div className='w-1/7 flex items-center gap-4'>
                        <BackButton />
                        <button className="border border-white py-1 m-1 px-4 rounded hover:opacity-80 text-white" onClick={showLanguageSelectionModal}>{lang?.name?.toUpperCase()}</button>
                    </div>
                    :
                    <></>
                }
                </div>
            </nav>
        </>
    )
}
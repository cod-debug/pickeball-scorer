import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDefaultBackgroundNormal } from "../assets/js/changeBodyBackground.js";
import { loadLocalizedCssFile } from "../assets/js/common.jsx";
import { NavBar } from "../components/Nav/NavBar.jsx";
import Loader from "../components/Loader/Loader.jsx";

let pageData = {};
let pageDisclaimer = "";
export default function Departments() {
    const lang = localStorage.getItem("__ingenuiti_ihg-nhop_lang")
        ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_lang")).code
        : JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang"))
        ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang"))
              .code
        : "en";

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const loaderData = useOutletContext();

    let selected_region = localStorage.getItem(
        "__ingenuiti_ihg-nhop_selected_region",
    )
        ? localStorage.getItem("__ingenuiti_ihg-nhop_selected_region")
        : "americas";

    const general = loaderData.generalData;
    const translationData = loaderData.translationData;
    const regionDualBrands = loaderData.dualBrandRegionData[selected_region];
    pageDisclaimer = translationData[general.brand] || general.brand.dual_brands_disclaimer;

    function selectBrand(e, brand){
        // using localstorage for refresh purposes
        localStorage.setItem('__ingenuiti_ihg-nhop_selected_brand', brand);

        // Then proceed to page-2
        navigate('/dual-brands/departments');
    }

    useDefaultBackgroundNormal();
    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`./content/en/dualBrand.json`).then(async (response) => {
            const newPageData = await response.json(); // load css file for current language
            loadLocalizedCssFile(lang);

            // set page data base on language
            pageData = newPageData;

            setIsLoading(false);
        });
    }, [lang, loaderData, selected_region]);

    if (isLoading) {
        return <Loader />;
    }

    function dualBrandNameDisplay(name){
        const dash_regex = /[-–—]/g;
        const formatted_name = translationData[name] ? translationData[name].replace(dash_regex, "<br />") : name.replace(dash_regex, "<br />");

        return formatted_name;
    }

    return (
        <>
            <NavBar
                backLink={"/"}
                backText={translationData[pageData.back] || pageData.back}
            />
            <div className="container mx-auto px-6" id="page3">
                <div className="text-primary font-bold">
                    <div
                        className="common-banner flex justify-center items-center"
                        style={{
                            backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0, .5), rgba(0,0,0, .7)), url('./img/dual_brand_images/Dual Brand Scenario Selection.webp')`,
                        }}
                    >
                        <div>
                            <div className="text-6xl text-center text-white text-wide">
                                {translationData[pageData.title] || pageData.title}
                            </div>
                            
                            <div className="flex justify-center mt-8">
                                <div className="flex flex-row text-white gap-2 items-center">
                                    <div className="xl:text-2xl lg:text-lg md:text-4xl text-4xl">
                                        {
                                            general
                                                ? translationData[general.brand.dual_brands] || general.brand.dual_brands
                                                : "Dual-Branded Hotels"
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8 bg-primary">
                    <div className="text-center">
                        <div className="border-b border-white mx-auto mb-8 text-center w-1/2">
                            <div className="text-6xl pb-4 text-white">
                                {translationData[
                                    pageData.select_dual_brand.trim()
                                ] || pageData.select_dual_brand.trim()}
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                        {Object.entries(regionDualBrands).map(([key, value]) => (
                            <button
                                onClick={(event) => selectBrand(event, key)}
                                key={key}
                            >
                                <div className="bg-white w-full p-4 text-center text-2xl font-bold department_btn" dangerouslySetInnerHTML={{ __html: dualBrandNameDisplay(value.name) }}></div>
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 text-white">
                        <p dangerouslySetInnerHTML={{__html: pageDisclaimer}} className="italic"></p>
                    </div>
                </div>
            </div>
        </>
    );
}

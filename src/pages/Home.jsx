import animateBrandSelection from "../assets/js/animateBrandSelection.js";
import { changeBodyBackground } from "../assets/js/changeBodyBackground.js";
import { useEffect, useState } from "react";
import { NavBar } from "../components/Nav/NavBar.jsx";
import { loadLocalizedCssFile } from "../assets/js/common.jsx";
import Loader from "../components/Loader/Loader.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import BrandButtonsGrid from "../components/Home/BrandButtonsGrid.jsx";

let homeData = {};
let regionData = null;
let dualBrandRegionData = null;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState(
    localStorage.getItem("__ingenuiti_ihg-nhop_selected_region")
      ? localStorage.getItem("__ingenuiti_ihg-nhop_selected_region")
      : "americas"
  );
  const lang = localStorage.getItem("__ingenuiti_ihg-nhop_lang")
    ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_lang")).code
    : JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang"))
    ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang")).code
    : "en";
  const loaderData = useOutletContext();
  const general = loaderData.generalData;
  const translationData = loaderData.translationData;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`./content/en/homePage.json`).then(async (response) => {
      const homePageData = await response.json();
      // set home page localized data
      homeData = homePageData;

      // set localized regions.js data
      regionData = loaderData.regionData;
      
      // set localized dual brands region data
      dualBrandRegionData = loaderData.dualBrandRegionData;

      // in home page the background should be an image in other pages the body background is plain color
      changeBodyBackground("./img/home-bg.jpeg");

      // load the custom css file per language
      loadLocalizedCssFile(lang);

      // set loading to false when all data was set for page was loaded
      setIsLoading(false);
    });
  }, [loaderData, lang]);

  function changeActiveRegion(region) {
    // Execute animation and list of brands when clicked region is not equal to active region.
    if (region !== activeRegion) {
      
      animateBrandSelection();
      localStorage.setItem("__ingenuiti_ihg-nhop_selected_region", region);
      setActiveRegion(() => region);
    }
  }

  function handleOpenDualBrand(){
    navigate('/dual-brands')
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-6" id="homePage">
        <div className="w-full py-4 mb-8 text-wide">
          <div className="text-lg text-white">{translationData[homeData.welcome] || homeData.welcome}</div>
          <div className="text-5xl font-bold text-white">{translationData[homeData.title] || homeData.title}</div>
        </div>

        <div className="flex justify-between gap-2">
          {regionData !== null &&
            Object.keys(regionData).map((key) => (
              <button
                key={key}
                className={`${
                  activeRegion === key
                    ? "bg-accent text-white"
                    : "bg-white text-black"
                } px-4 py-2 w-1/2 region-btn`}
                onClick={() => changeActiveRegion(key)}
              >
                {translationData[homeData.regions[key]] || homeData.regions[key]}
              </button>
            ))}
        </div>
        <div className="w-full p-4 bg-primary mt-4 rounded min-h-96">
          <div
            className="grid lg:grid-cols-12 gap-8 md:grid-cols-2 sm:grid-cols-1 zoomIn"
            id="brandSelection"
          >
              <BrandButtonsGrid regionData={regionData}
                activeRegion={activeRegion}
                general={general}
                translationData={translationData}
                dualBrandRegionData={dualBrandRegionData}
                handleVisitDualBrand={handleOpenDualBrand}
              />
          </div>
        </div>
      </div>
    </>
  );
}

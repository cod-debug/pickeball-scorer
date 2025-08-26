import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import brandingColor from "../assets/js/brandingColor.js";
import { useDefaultBackgroundNormal } from "../assets/js/changeBodyBackground.js";
import { loadLocalizedCssFile } from "../assets/js/common.jsx";
import { NavBar } from "../components/Nav/NavBar.jsx";
import Loader from "../components/Loader/Loader.jsx";

let departments = [];
let brand = {};
let pageData = {};
export default function DualBrandDepartments() {
  const lang = localStorage.getItem("__ingenuiti_ihg-nhop_lang")
    ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_lang")).code
    : JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang"))
    ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang")).code
    : "en";
  let selected_brand_key = localStorage.getItem("__ingenuiti_ihg-nhop_selected_brand");

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const loaderData = useOutletContext();

  const translationData = loaderData.translationData;

  useDefaultBackgroundNormal();
  useEffect(() => {
    if (!localStorage.getItem("__ingenuiti_ihg-nhop_selected_brand")) {
      window.location.href = "./";
    }

    window.scrollTo(0, 0);

    fetch(`./content/en/departments.json`).then(async (response) => {
      const newPageData = await response.json(); // load css file for current language
      loadLocalizedCssFile(lang);

      let selected_region = localStorage.getItem("__ingenuiti_ihg-nhop_selected_region")
        ? localStorage.getItem("__ingenuiti_ihg-nhop_selected_region")
        : "americas";

      // set departments data
      departments =
        loaderData.dualBrandRegionData[selected_region][selected_brand_key].departments;

      // set page data base on language
      pageData = newPageData;

      // set brand data
      brand = loaderData.brandingData[selected_brand_key];

      setIsLoading(false);

      // add a delay to load the javascript after the component is successfully updated.
      setTimeout(() => {
        // execute branding colors
        brandingColor(loaderData.brandingData[selected_brand_key]);
      }, 1);
    });
  }, [lang, loaderData, selected_brand_key]);

  function selectRole(e, role_id) {
    localStorage.setItem("__ingenuiti_ihg-nhop_selected_role_id", role_id);
    navigate("/dual-brands/trainings");
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar backLink={"/dual-brands"} backText={translationData[pageData.back] || pageData.back} />
      <div className="container mx-auto px-6" id="page3">
        <div className="text-primary font-bold">
          <div
            className="common-banner flex justify-center items-center"
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0, .5), rgba(0,0,0, .7)), url('${
                brand ? brand?.pictures?.department_page_banner : ""
              }')`,
            }}
          >
            <div>
              <div className="text-6xl text-center text-white text-wide">
                { translationData[pageData.title] || pageData.title }
              </div>
              
              <div className="flex justify-center mt-8">
                <div className="flex flex-row text-white gap-2 items-center">
                  <div className="xl:text-2xl lg:text-lg md:text-4xl text-4xl">
                    { brand?.name }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {departments ? (
          <div className="p-8 __brand_bg_secondary">
            <div className="text-center">
              <div className="border-b border-white mx-auto mb-8 text-center w-1/2">
                <div className="text-6xl pb-6">{translationData[pageData.select_role.trim()] || pageData.select_role.trim()}</div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
              {Object.entries(departments).map(([key, value]) => (
                <button onClick={(event) => selectRole(event, key)} key={key}>
                  <div className="__brand_bg_primary w-full p-4 text-center text-2xl font-bold department_btn">
                    {translationData[value.name] || value.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 __brand_bg_secondary">
            <div className="p-3 text-2xl text-center text-gray-700">
              {brand ? translationData[brand.note] || brand.note : ""}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

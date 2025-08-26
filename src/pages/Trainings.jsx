import { useEffect, useState } from "react";
import { loadLocalizedCssFile, showBrandLogo } from "../assets/js/common.jsx";
import { NavBar } from "../components/Nav/NavBar.jsx";
import ExportCsv from "../components/Csv/ExportCsv.jsx";
import { PDFDownloadLink, /* PDFViewer */ } from "@react-pdf/renderer";
import CoursesPdf from "../components/Pdf/CoursesPdf.jsx";
import CoursesPdfRtl from "../components/Pdf/CoursesPdfRtl.jsx";
import { Button } from "flowbite-react";
import Loader from "../components/Loader/Loader.jsx";
import CourseCard from "../components/Trainings/CourseCard.jsx";
import { useOutletContext } from "react-router-dom";
import brandingColor from "../assets/js/brandingColor.js";

let role = {};
let unfilteredCourses = {};
let brand = {};
let pageData = {};
let timeframeList = [];
let translationData;

export default function Trainings() {
  const brand_id = localStorage.getItem("__ingenuiti_ihg-nhop_selected_brand");
  const role_id = localStorage.getItem("__ingenuiti_ihg-nhop_selected_role_id");
  const region = localStorage.getItem("__ingenuiti_ihg-nhop_selected_region")
    ? localStorage.getItem("__ingenuiti_ihg-nhop_selected_region")
    : "americas";
  const lang = localStorage.getItem("__ingenuiti_ihg-nhop_lang")
    ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_lang")).code
    : JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang"))
    ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang")).code
    : "en";
  const is_rtl = localStorage.getItem("__ingenuiti_ihg-nhop_lang")
    ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_lang")).rtl
      ? true
      : false
    : false;

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("all");
  const [courses, setCourses] = useState([]);
  const loaderData = useOutletContext();
  const general = loaderData.generalData;
  translationData = loaderData.translationData;

  useEffect(() => {
    if (!localStorage.getItem("__ingenuiti_ihg-nhop_selected_brand")) {
      window.location.href = "./";
    }
    window.scrollTo(0, 0);
    Promise.all([
      fetch(`./content/en/training/${region}.${brand_id}.${role_id}.json`).then((response) => response.json()),
      fetch(`./content/en/trainings.json`).then((response) =>response.json())
    ])
      .then(([coursesData, pageDataFetched]) => {
        // load css file for current language
        loadLocalizedCssFile(lang);

        // set page data
        pageData = pageDataFetched;

        // set brand data
        brand = loaderData.brandingData[brand_id];

        // set the selected role
        role = loaderData.regionData[region][brand_id]["departments"][role_id];

        // implement new translation approach
        const translatedCourses = coursesData.trainings.map((course) => {
          const translatedCourse = {
            ...course,
            "title": translationData[course.title] || course.title,
            "timeframe": translationData[course.timeframe] || course.timeframe,
            "notes": translationData[course.notes] || course.notes
          }
          return translatedCourse;
        });

        // set trainings / courses and sort it using the sorting identified on excel file
        const newCourses = translatedCourses.sort((a, b) => {
          // First, sort by timeframeSorting
          const timeframeDiff = a.timeframeSorting - b.timeframeSorting;

          // If they are equal, sort by courseName
          if (timeframeDiff === 0) {
            return a.title.localeCompare(b.title,lang.substring(0,2)); // language code as second parameter for sorting
          }

          // Otherwise, return the difference from timeframeSorting
          return timeframeDiff;
        });

        // courses to be displayed on screen
        setCourses(newCourses);

        // set unfiltered courses to be used when filtering courses
        unfilteredCourses = newCourses;

        // get the list of timeframes based on available timeframe for current list
        timeframeList = [
          ...new Map(
            newCourses.map((training) => {
              const timeframe = training.timeframe === "" ? "n/a" : training.timeframe;
              return [timeframe, { sorting: training.timeframeSorting, timeframe }];
            })
          ).values(),
        ]
        .sort((a, b) => a.sorting - b.sorting)
        .map((i) => i.timeframe);

        setTimeout(() => {
          // apply the branding color
          brandingColor(loaderData.brandingData[brand_id]);
        }, 1);

        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, [brand_id, lang, region, role_id, loaderData]);

  function filterCourse(e) {
    let timeframe_filter = e.target.value.toLowerCase();

    if (timeframe_filter === "all") {
      setSelectedTimeFrame("all");
      // if filter is all show unfiltered courses
      setCourses(unfilteredCourses);
    } else if (timeframe_filter === "n/a") {
      setSelectedTimeFrame("_");
      // if is filtered show filtered courses unless it is N/A
      setCourses(
        unfilteredCourses.filter((i) => i.timeframe.toLowerCase() === "")
      );
    } else {
      setSelectedTimeFrame(timeframe_filter.toLowerCase().replaceAll(" ", "_"));
      // if is filtered show filtered courses
      setCourses(
        unfilteredCourses.filter(
          (i) => i.timeframe.toLowerCase() === timeframe_filter
        )
      );
    }

    setTimeout(() => {
      // apply the branding color
      brandingColor(brand);
    }, 0);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar backLink={"/departments"} backText={translationData[pageData.back] || pageData.back} />
      <div className="container mx-auto px-6" id="page4">
        <div className="text-primary font-bold">
          <div
            className="common-banner flex justify-center items-center"
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0, .5), rgba(0,0,0, .7)), url(${brand?.pictures?.training_page_banner})`,
            }}
          >
            <div>
              <div className="text-6xl text-center text-white text-wide">
                {translationData[pageData.title] || pageData.title}
              </div>
              {["special-project", "ruby"].includes(
                  brand_id,
              ) ? (
                  <>
                      {brand_id ===
                          "special-project" && (
                          <div className="flex justify-center mt-8">
                              <div className="flex flex-row text-white gap-2 items-center">
                                  <div className="xl:text-2xl lg:text-lg md:text-4xl text-4xl">
                                      {general ? translationData[general.brand.ihg_unbranded_hotels] || general.brand.ihg_unbranded_hotels: "IHG Unbranded Hotels"}
                                  </div>
                              </div>
                          </div>
                      )}

                      {brand_id === "ruby" && (
                          <div className="flex justify-center mt-8">
                              <div className="flex flex-row text-white gap-2 items-center">
                                  <div className="xl:text-2xl lg:text-lg md:text-4xl text-4xl">
                                      {general ? translationData[general.brand.ruby] || general.brand.ruby: "Ruby"}
                                  </div>
                              </div>
                          </div>
                      )}
                  </>
              ) : (
                  brand.pictures && showBrandLogo(brand)
              )}
            </div>
          </div>
        </div>
        {/* <PDFViewer width="100%" height="600px">
            <CoursesPdfRtl
              courses={courses}
              role_name={role?.name || ''}
              brand_name={brand_id.replaceAll("-", " ")}
              brand_image={brand?.pictures?.logo}
              region={region}
            />
        </PDFViewer> */}
        <div className="p-8 __brand_bg_secondary">
          <div className="text-6xl mb-8 text-center">{translationData[role?.name] || role?.name || ""}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
            {timeframeList.length > 1 ? (
              <div className="h-100 bg-white text-black p-4 rounded shadow-md flex flex-col justify-between">
                <label htmlFor="select_timeframe">
                  {translationData[pageData.timeframe_label] || pageData.timeframe_label}:{" "}
                </label>
                <select
                  onChange={filterCourse}
                  className="text-black"
                  id="select_timeframe"
                >
                  <option value="all">{translationData[pageData.all] || pageData.all}</option>
                  {timeframeList.map((timeframe) => {
                    return (
                      <option value={timeframe.toLowerCase()} key={timeframe.toLowerCase()}>
                        {(translationData[timeframe] || timeframe).toUpperCase()}
                      </option>
                    );
                  })}
                </select>
                <div className="mt-4 flex items-center gap-2 border-t pt-4">
                  <img src="./img/favicon.png" alt="Crest icon" width="30" />
                  <span>{translationData[pageData.crest_note] || pageData.crest_note}</span>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div></div>
            <div></div>
            <div className="flex justify-end gap-2 text-right">
              <div>
                <Button className="bg-primary h-auto border-0 hover:bg-[#155e75]">
                  <PDFDownloadLink
                    document={
                      !is_rtl ? (
                        <CoursesPdf
                          courses={courses}
                          role_name={role?.name || ""}
                          brand_name={brand_id.replaceAll("-", " ")}
                          region={region}
                          lang={lang}
                        />
                      ) : (
                        <CoursesPdfRtl
                          courses={courses}
                          role_name={role?.name || ""}
                          brand_name={brand_id.replaceAll("-", " ")}
                          region={region}
                          lang={lang}
                        />
                      )
                    }
                    fileName={`${brand_id.replaceAll("-", "_")}-${role?.name
                      ?.toLowerCase()
                      .replaceAll(" ", "_")}-${selectedTimeFrame}-courses.pdf`}
                  >
                    {({ loading }) =>
                      loading
                        ? `${translationData[pageData.loading_pdf_data] || pageData.loading_pdf_data}...`
                        : translationData[pageData.export_pdf] || pageData.export_pdf
                    }
                  </PDFDownloadLink>
                </Button>
              </div>
              <ExportCsv
                data={{
                  text: translationData[pageData.export_csv] || pageData.export_csv,
                  courses: courses,
                  brand_name: brand_id.replaceAll("-", " "),
                  region: region,
                  fileName: `${brand_id.replaceAll("-", "_")}-${role?.name
                    ?.toLowerCase()
                    .replaceAll(" ", "_")}-${selectedTimeFrame}-courses`,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.length > 0 &&
              courses.map((course, key) => {
                return (
                  <CourseCard
                    key={`${course.title}${key}`}
                    course={course}
                    brand={brand}
                    pageData={pageData}
                    translationData={translationData}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

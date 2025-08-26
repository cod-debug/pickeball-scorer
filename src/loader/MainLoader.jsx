export async function commonDataLoader() {
  const lang = localStorage.getItem("__ingenuiti_ihg-nhop_lang")
  ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_lang")).code
  : JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang"))
  ? JSON.parse(localStorage.getItem("__ingenuiti_ihg-nhop_defaultLang")).code
  : "en";

  const regionResponse = await fetch(`./content/en/regions.json`);
  const regionResponseData = await regionResponse.json();

  const dualBrandRegionResponse = await fetch(`./content/en/dualBrandRegions.json`);
  const dualBrandRegionData = await dualBrandRegionResponse.json();

  const propertiesResponse = await fetch(`./properties.json`);
  const propertiesResponseData = await propertiesResponse.json();

  const brandingResponse = await fetch(`./content/en/branding.json`);
  const brandingResponseData = await brandingResponse.json();

  const generalResponse = await fetch(`./content/en/general.json`);
  const generalResponseData = await generalResponse.json();

  const dualBrandResponse = await fetch(`./content/en/dualBrand.json`);
  const dualBrandResponseData = await dualBrandResponse.json();

  let translationResponseData = {};
  if(lang !== 'en'){
    const translationResponse = await fetch(`./content/${lang}/translation.json`);
    translationResponseData = await translationResponse.json();
  }

  return {
    dualBrand: dualBrandResponseData,
    dualBrandRegionData: dualBrandRegionData,
    regionData: regionResponseData,
    propertiesData: propertiesResponseData,
    brandingData: brandingResponseData,
    generalData: generalResponseData,
    translationData: translationResponseData,
  };
}

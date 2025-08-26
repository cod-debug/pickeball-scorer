export const showBrandLogo = (brand) => {
    if(brand){
        if(brand.pictures.logo){
            return (<img src={brand?.pictures?.logo} className="w-1/4 mx-auto mt-8" alt={brand.name || 'brand logo'} />)
        } else {
            return (<p className="text-center text-gray-400 mt-8">Loading logo image...</p>)
        }
    } else {
        return (<></>)
    }
}

export function loadLocalizedCssFile(lang){
    if(document.getElementById("customCssPerLang")){
        document.getElementById("customCssPerLang").remove();
    }
    // Create a new link element
    var linkElement = document.createElement("link");

    // Set attributes for the link element
    linkElement.rel = "stylesheet";
    linkElement.id = "customCssPerLang";
    linkElement.href = `./content/${lang}/assets/custom.css`;

    // Append the link element to the head section of the document
    document.head.appendChild(linkElement);
}
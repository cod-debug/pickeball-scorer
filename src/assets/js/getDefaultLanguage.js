function getDefaultLanguage(settings) {
    const defaultLanguageName = settings.default.name;
    const availableLanguages = settings["available-languages"];

    //Get if there's an Item for lang
    if (localStorage.getItem("__ingenuiti_ihg-nhop_lang") === null) { 
        localStorage.setItem("__ingenuiti_ihg-nhop_lang", '{"name":"English","code":"en"}');
    }
    // Find the language with the default name
    for (const languageCode in availableLanguages) {
        if (availableLanguages[languageCode].name === defaultLanguageName) {
            let result = {...availableLanguages[languageCode], 'code': languageCode};
            
            // if there is no 'lang' saved in localstorage yet, reload is needed to apply RTL or LTR direction.
            if(!localStorage.getItem('__ingenuiti_ihg-nhop_lang')){
                localStorage.setItem('__ingenuiti_ihg-nhop_lang', JSON.stringify(result));
                window.location.reload();
            }
            return result;
        }
    }

    // Return null or handle default language not found
    return null;
}

export default getDefaultLanguage;
export const showLanguageSelectionModal = () => {
    let modal = document.getElementById("languageSelectionModal");
    let backdrop = document.querySelector(".modal-backdrop");

    backdrop.style = "display: block;";
    modal.style="display: block; animation: fadeInTop ease .3s; top: 50%;";
}

export const closeLanguageSelectionModal = () => {
    let modal = document.getElementById("languageSelectionModal");
    let backdrop = document.querySelector(".modal-backdrop");

    backdrop.style = "display: none;";
    modal.style="display: none;";
}
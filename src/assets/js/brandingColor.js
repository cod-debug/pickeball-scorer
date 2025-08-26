export default function brandingColor(brand){
    let primary_color = brand.colors.primary;
    let primary_color_text = brand.colors.primary_text;
    let accent_color = brand.colors.accent;
    let accent_color_text = brand.colors.accent_text;
    let secondary_color = brand.colors.secondary;
    let secondary_color_text = brand.colors.secondary_text;

    // Select all elements with the class "__brand_bg_primary" and apply styles
    const primaryElements = document.querySelectorAll(".__brand_bg_primary");
    primaryElements.forEach(element => {
        element.style.backgroundColor = primary_color;
        element.style.color = primary_color_text;
    });

    // Select all elements with the class "__brand_accent_bg" and apply styles
    const accentElements = document.querySelectorAll(".__brand_bg_accent");
    accentElements.forEach(element => {
        element.style.backgroundColor = accent_color;
        element.style.color = accent_color_text;
    });

    // Select all elements with the class "__brand_accent_bg" and apply styles
    const secondaryElements = document.querySelectorAll(".__brand_bg_secondary");
    secondaryElements.forEach(element => {
        element.style.backgroundColor = secondary_color;
        element.style.color = secondary_color_text;
    });
}
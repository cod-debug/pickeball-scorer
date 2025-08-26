export default function animateBrandSelection(){
    let brands_div = document.getElementById("brandSelection");

    brands_div.classList.remove("zoomIn");
    setTimeout(() => {
        brands_div.classList.add("zoomIn");
    }, .1)
}
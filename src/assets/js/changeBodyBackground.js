export function changeBodyBackground(src){
    console.log(src);
    document.body.style=`
        background-image: linear-gradient(to top, #0000007a, #0000007a), url("${src}");
        background-size: cover; 
        background-attachment: fixed;  
    `;
}

export function useDefaultBackgroundNormal(color = 'rgb(240 242 243)'){
    document.body.style = `background: ${color};`;
}
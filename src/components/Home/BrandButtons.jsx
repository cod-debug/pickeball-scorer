import { useNavigate, useOutletContext } from "react-router-dom";

export default function BrandButtons({from, to, activeRegion, general}){
  const loaderData = useOutletContext();
  const translationData = loaderData.translationData;

    const navigate = useNavigate();

    function selectBrand(brand, brandData){
        // if brand has redirection only redirect to specific link rather than moving to departments page
        if(brandData.redirection){
            window.location.href = brandData.redirection;
            return false;
        }
        // using localstorage for refresh purposes
        localStorage.setItem('__ingenuiti_ihg-nhop_selected_brand', brand);

        // Then proceed to page-2
        navigate('departments');
    }

    return (
        Object.keys(activeRegion).map((brand_key, key) => {
            // eslint-disable-next-line no-lone-blocks
            if(key >= from && key <= to){
                return (
                    <div key={brand_key} className={`sm:col-span-1 text-center md:col-span-1 lg:col-span-2 my-auto p-4 brand-btn`}>
                        {
                            !activeRegion[brand_key].redirection &&
                                <button onClick={() => selectBrand(brand_key, activeRegion[brand_key])}>
                                    {
                                        ["special-project", "ruby"].includes(brand_key)
                                        ?
                                        <div className="flex flex-row text-white items-center">
                                            {
                                                brand_key === "special-project" && <div className="xl:text-2xl lg:text-lg md:text-4xl text-4xl">{general ? translationData[general.brand.ihg_unbranded_hotels] || general.brand.ihg_unbranded_hotels : 'IHG Unbranded Hotels'}</div>
                                            }
                                            {
                                                brand_key === "ruby" && <div className="xl:text-2xl lg:text-lg md:text-4xl text-4xl">{general ? translationData[general.brand.ruby] || general.brand.ruby : 'Ruby'}</div>
                                            }
                                            
                                        </div>
                                        :
                                        <img src={activeRegion[brand_key].pictures.logo}
                                            className="w-full cursor-pointer"
                                            alt={activeRegion[brand_key].name}
                                            title={activeRegion[brand_key].name}
                                            
                                        />
                                    }
                                </button>
                        }

                        {
                            activeRegion[brand_key].redirection &&
                            <a href={activeRegion[brand_key].redirection} rel="noreferrer" target="_blank">
                                <img src={activeRegion[brand_key].pictures.logo}
                                    className="w-full cursor-pointer"
                                    alt={activeRegion[brand_key].name}
                                    title={activeRegion[brand_key].name}
                                    
                                />
                            </a>
                        }
                    </div>
                )
            }
            return null; 
        })
    )
}
import BrandButtons from "./BrandButtons";

export default function BrandButtonsGrid({
    regionData,
    activeRegion,
    general,
    translationData,
    dualBrandRegionData,
    handleVisitDualBrand,
}) {
    return (
        <>
            {activeRegion === "americas" && (
                <>
                    <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 my-auto"></div>
                    <BrandButtons
                        from={0}
                        to={2}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <BrandButtons
                        from={3}
                        to={6}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-1 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <BrandButtons
                        from={7}
                        to={10}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-3 lg:block my-auto"></div>
                    <BrandButtons
                        from={11}
                        to={13}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-3 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-1 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <BrandButtons
                        from={14}
                        to={16}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />

                    {/* Additional Button for Dual Brands */}
                    <div className="sm:col-span-1 text-center md:col-span-1 lg:col-span-2 my-auto p-4 brand-btn">
                        <button
                            onClick={() =>
                                handleVisitDualBrand(
                                    dualBrandRegionData[activeRegion],
                                )
                            }
                        >
                            <div className="flex flex-row text-white items-center">
                                <div className="xl:text-2xl lg:text-lg md:text-4xl text-4xl">
                                    {general
                                        ? translationData[
                                              general.brand.dual_brands
                                          ] || general.brand.dual_brands
                                        : "Dual Brands"}
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="sm:col-span-1 md:col-span-2 md:hidden my-auto"></div>
                </>
            )}
            {activeRegion === "emeaa" && (
                <>
                    <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 my-auto"></div>
                    <BrandButtons
                        from={0}
                        to={2}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <BrandButtons
                        from={3}
                        to={6}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-3 lg:block my-auto"></div>
                    <BrandButtons
                        from={7}
                        to={9}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-1 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <BrandButtons
                        from={10}
                        to={13}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-3 lg:block my-auto"></div>
                </>
            )}
            {activeRegion === "china" && (
                <>
                    <div className="sm:col-span-1 md:col-span-2 lg:col-span-3 my-auto"></div>
                    <BrandButtons
                        from={0}
                        to={2}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <BrandButtons
                        from={3}
                        to={6}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                    <BrandButtons
                        from={7}
                        to={10}
                        activeRegion={regionData[activeRegion]}
                        general={general}
                    />
                    <div className="sm:col-span-1 md:col-span-2 md:hidden lg:col-span-2 lg:block my-auto"></div>
                </>
            )}
        </>
    );
}

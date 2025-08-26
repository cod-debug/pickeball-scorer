import CourseButton from "./CourseButton";

export default function CourseCard({course, brand, pageData, translationData}){
    return (
        <div className={`relative h-100 bg-white p-4 rounded shadow-md flex flex-col justify-between border-t-2 border-${brand.colors.highlight ? brand.colors.highlight : 'white'}`}>
            <div>
                {
                    course.timeframe && <div className="bg-gray-300 text-gray-800 text-xs font-medium me-2 w-fit px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 uppercase mr-[40px]">{ course.timeframe }</div>
                }
                {
                    course.isPriority.toLowerCase() === "y" && <span className="absolute top-2 right-3" title="Priority">
                        <img src="./img/favicon.png" alt="Icon" width="30" />
                    </span>
                }
                <p className="md:text-lg lg:text-2xl self-start font-bold tracking-tight text-gray-800 dark:text-white my-4">
                    <label dangerouslySetInnerHTML={{__html: course.title}}></label>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                    <strong>{translationData[pageData.notes_label] || pageData.notes_label}: </strong>
                    <br />
                    <span dangerouslySetInnerHTML={{ __html: course.notes || '--'}}></span>
                </p>
            </div>
            <div className="w-full">
                <CourseButton course={course} translationData={translationData} />
            </div>
        </div>
    )
}
import { Button } from "flowbite-react";

const CourseButton = ({course, translationData}) => {
    if(course['course-id'] !== ''){
        if(course.link !== '' ){
            return (<a href={course.link} target="_blank" rel="noreferrer">
            <Button className="__brand_bg_primary w-full uppercase course-btn" title={course['link']} >
                {course['course-id'].length > 25 ? course['course-id'].substring(0, 25) + "..." : course['course-id']}
                <svg className="rtl:mr-2 ltr:ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
                </svg>
            </Button>
        </a>)
        } else {
            return (<p className="text-center bg-gray-400 text-gray-100 p-2 uppercase">{translationData[course['course-id']] || course['course-id']}</p>)
        }
    } else {
        return (<></>)
    }
}

export default CourseButton;
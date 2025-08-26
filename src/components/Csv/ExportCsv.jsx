import { Button } from 'flowbite-react';
import CsvDownloader from 'react-csv-downloader';

export default function ExportCsv({data}){
    const cells = data.courses.map((course) => {
        let cellData = {
            title: course.title,
            timeframe: course.timeframe,
            notes: course.notes,
            courseId: course['course-id'],
            link: course.link,
        }

        return cellData;
    });

    const columns = [
        {
            id: "title",
            displayName: "Course Title",
        },
        {
            id: "timeframe",
            displayName: "Timeframe",
        },
        {
            id: "notes",
            displayName: "Notes",
        },
        {
            id: "courseId",
            displayName: "Course ID",
        },
        {
            id: "link",
            displayName: "Link",
        }
    ]
    return (
        <div>
            <CsvDownloader
                datas={cells}
                filename={data.fileName}
                extension='.csv'
                columns={columns}
                wrapColumnChar='"'
            >
                <Button className="bg-primary h-auto border-0 hover:bg-[#155e75]">
                    {data.text}
                </Button>
            </CsvDownloader>
        </div>
    )
}

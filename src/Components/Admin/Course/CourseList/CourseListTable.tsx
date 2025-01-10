import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { CourseTitleLabel } from "@/Constant";
import { Card, CardBody } from "reactstrap";

import { useEffect, useState } from "react";
import { CourseProps } from "@/Types/Course.type";
import DataTable from "react-data-table-component";
import { sampleCoursesData } from "./SampleData";
import { courseTableColumns } from "@/Data/Admin/Courses/Course";
import { getCourses } from "@/app/api/admin/course";
import FilterComponent from "@/CommonComponent/FilterComponent";

const CourseListTable = () => {
    const [filterText, setFilterText] = useState('');
    const [courses,setCourses]=useState([]);
    const fetchCourses = async ()=>{
        const response = await getCourses();
        setCourses(response.courses);
        return response;
    }
    useEffect(()=>{
        fetchCourses();
    },[])
        const filteredItems: CourseProps[] = courses.filter(
            (item: CourseProps) => {
                return Object.values(item).some((value) =>
                    value && value.toString().toLowerCase().includes(filterText.toLowerCase())
                );
            }
        );
    return (
        <Card>
                <CommonCardHeader headClass="pb-0 card-no-border" title={CourseTitleLabel} />
                <CardBody>
                    <FilterComponent
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                        filterText={filterText}
                    />
                    <div className="table-responsive custom-scrollbar user-datatable mt-3">
                        <DataTable data={filteredItems} columns={courseTableColumns} striped={true} fixedHeader fixedHeaderScrollHeight="40vh" className="display" />
                    </div>
                </CardBody>
            </Card>
    );
}

export default CourseListTable;
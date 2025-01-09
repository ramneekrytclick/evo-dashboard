"use client"
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { BlogsApprovalTitle, BlogsTitle, ExtraLargeModal } from "@/Constant";
import { Button, Card, CardBody } from "reactstrap";
import { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { sampleBlogsData } from "./SampleData";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { BlogProps } from "@/Types/Blogs.type";
import { blogTableColumns } from "@/Data/Admin/Blogs/Blog";
import CommonModal from "@/CommonComponent/CommonModal";
import { ChevronsRight } from "react-feather";

const BlogsTable = () => {
    const [filterText, setFilterText] = useState('');
    const [blogs,setBlogs]=useState(sampleBlogsData);
    // const fetchCourses = async ()=>{
    //     const response = await getCourses();
    //     console.log(response.courses);
        
    //     setBlogs(response.courses);
    //     return response;
    // }
    // useEffect(()=>{
    //     fetchCourses();
    // },[])
        const filteredItems: BlogProps[] = blogs.filter(
            (item: BlogProps) => {
                return Object.values(item).some((value) =>
                    value && value.toString().toLowerCase().includes(filterText.toLowerCase())
                );
            }
        );
    return (
        <Card>
                <CommonCardHeader headClass="pb-0 card-no-border" title={BlogsApprovalTitle} />
                <CardBody>
                    <FilterComponent
                        onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                        filterText={filterText}
                    />
                    <div className="table-responsive custom-scrollbar user-datatable mt-3">
                        <DataTable data={filteredItems} columns={blogTableColumns} striped={true} fixedHeader fixedHeaderScrollHeight="40vh" className="display" />
                    </div>
                    
                </CardBody>
            </Card>
    );
}



export default BlogsTable;
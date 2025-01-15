"use client"
import { LearningFilter } from "@/Constant";
import { useState } from "react";
import { Button, Row } from "reactstrap";

const CourseFilter = () => {
    const [filter,setFilter]=useState(true);
    return (
        <div className="md-sidebar">
        <Button color="primary" tag="a" className="email-aside-toggle md-sidebar-toggle" onClick={() => setFilter(!filter)}>{LearningFilter}</Button>
        <div className={`md-sidebar-aside job-sidebar ${filter ? "open" : ""}`}>
          <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc">
            <Row>
              {/* <CourseCategories />
              <CategoriesCheckBoxes />
              <UpcomingCourses /> */}
            </Row>
          </div>
        </div>
      </div>
    );
}

export default CourseFilter;
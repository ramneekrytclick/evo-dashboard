'use client'

import { useCallback, useState } from "react";
import CourseFormNav from "../CourseFormNav";
import CourseTabContents from "../CourseTabContents";

const CreateCourseForm = () => {
    const [steps,setSteps]= useState(1);
    const activeCallBack = useCallback((tab: number) => {
        setSteps(tab);
    }, []);
    const requirements = "name,category,subcategory,description,duration,mentorAssigned,managerAssigned,batchesAvailable,promoCodes,realPrice,discountedPrice"
    
    return (
        <>
                    <CourseFormNav steps={steps} setSteps={setSteps} />
                    <CourseTabContents steps={steps} activeCallBack={activeCallBack} />
        </>
    );
}

export default CreateCourseForm;
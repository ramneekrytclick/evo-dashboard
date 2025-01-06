"use client"
import { newMentorInitialValue, newMentorValidation } from "@/Data/Admin/Users/Mentor/Mentor";
import { MentorInitialValue } from "@/Types/Mentor.type";
import { Form, Formik } from "formik";
import DetailsSection from "../../CommonComponents/DetailSection";
import MentorSection from "./MentorSection";


const CreateNewMentorForm = () => {
    const mentorSubmit = (values: MentorInitialValue)=>{
        // submit form data to your server
        //...
        console.log(values);
    }
    return (
        <Formik initialValues={newMentorInitialValue} validationSchema={newMentorValidation} onSubmit={mentorSubmit}>
            {()=>(
                <Form className="theme-form">
                    <DetailsSection/>
                    <MentorSection/>
                </Form>
            )}

        </Formik>
    )
}

export default CreateNewMentorForm;
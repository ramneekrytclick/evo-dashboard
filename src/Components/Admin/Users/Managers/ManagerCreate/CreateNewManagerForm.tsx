import { newManagerInitialValue, newManagerValidation } from "@/Data/Admin/Users/Manager/Manager";
import { ManagerInitialValue } from "@/Types/Manager.type";
import { Form, Formik } from "formik"
import DetailsSection from "./DetailSection";
import AboutSection from "./AboutSection";
import ButtonSection from "./ButtonSection";

const CreateNewManagerForm = () => {
    const managerSubmit = (values: ManagerInitialValue)=>{
        // submit form data to your server
        //...
        console.log(values);
    }
    return (
        <Formik initialValues={newManagerInitialValue} validationSchema={newManagerValidation} onSubmit={managerSubmit}>
            {()=>(
                <Form className="theme-form">
                    <DetailsSection/>
                    <AboutSection/>
                    <ButtonSection/>
                </Form>
            )}

        </Formik>
    )
  
 
}
export default CreateNewManagerForm
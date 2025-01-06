import { newManagerInitialValue, newManagerValidation, workingModeInputData } from "@/Data/Admin/Users/Manager/Manager";
import { ManagerInitialValue } from "@/Types/Manager.type";
import { Form, Formik } from "formik"
import DetailsSection from "../../CommonComponents/DetailSection";
import ButtonSection from "../../CommonComponents/ButtonSection";
import CommonSelectDropdown from "@/Components/Forms/FormControls/BaseInputs/Common/CommonSelectDropdown";
import { workingModeTitle } from "@/Constant";

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
                    <CommonSelectDropdown title={workingModeTitle} inputClass='btn-square digits custom-scrollbar' options={workingModeInputData} />
                    <ButtonSection/>
                </Form>
            )}

        </Formik>
    )
  
 
}
export default CreateNewManagerForm
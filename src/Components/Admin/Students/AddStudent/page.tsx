import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AddStudentTitle,  StudentTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddStudentForm from "./AddStudentForm";


const AddStudentContainer = () => {
    return (
        <>
             <Breadcrumbs mainTitle={AddStudentTitle} parent={StudentTitle} title={AddStudentTitle} />
            <Container fluid>
                <Row>
                    <AddStudentForm/>
                </Row>
            </Container>
        </>
    );
}

export default AddStudentContainer;
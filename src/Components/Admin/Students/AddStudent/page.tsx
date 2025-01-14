import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AddMentorTitle, MentorTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddStudentForm from "./AddStudentForm";


const AddStudentContainer = () => {
    return (
        <>
             <Breadcrumbs mainTitle={AddMentorTitle} parent={MentorTitle} title={AddMentorTitle} />
            <Container fluid>
                <Row>
                    <AddStudentForm/>
                </Row>
            </Container>
        </>
    );
}

export default AddStudentContainer;
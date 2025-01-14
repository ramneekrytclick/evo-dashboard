import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AddEmployerTitle, EmployerTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddEmployerForm from "./AddEmployerForm";

const AddEmployerContainer = () => {
    return (
        <>
             <Breadcrumbs mainTitle={AddEmployerTitle} parent={EmployerTitle} title={AddEmployerTitle} />
            <Container fluid>
                <Row>
                    <AddEmployerForm/>
                </Row>
            </Container>
        </>
    );
}

export default AddEmployerContainer;
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AddManager, AdminTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddManagerForm from "./AddManagerForm";

const AddManagerContainer = () => {
    return (
        <>
        <Breadcrumbs mainTitle={AddManager} parent={AdminTitle} title={AddManager}/>
        <Container fluid>
                <Row>
                    <AddManagerForm/>
                </Row>
            </Container>
        </>
    );
}

export default AddManagerContainer;
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AddManager, AdminTitle, TeamTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddManagerForm from "./AddManagerForm";

const AddManagerContainer = () => {
    return (
        <>
        <Breadcrumbs mainTitle={AddManager} parent={TeamTitle} title={AddManager}/>
        <Container fluid>
                <Row>
                    <AddManagerForm/>
                </Row>
            </Container>
        </>
    );
}

export default AddManagerContainer;
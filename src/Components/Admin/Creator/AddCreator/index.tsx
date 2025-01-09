import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AddCreatorTitle, CreatorTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddCreatorForm from "./AddCreatorForm";

const AddCreatorContainer = () => {
    return (
        <>
        <Breadcrumbs mainTitle={AddCreatorTitle} parent={CreatorTitle} title={AddCreatorTitle} />
            <Container fluid>
                <Row>
                    <AddCreatorForm/>
                </Row>
            </Container>
        </>
    );
}

export default AddCreatorContainer;
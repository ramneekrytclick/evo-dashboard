"use client"
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { addUserTitle, TeamTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddUserForm from "./AddUserForm";

const AddUserContainer = () => {
    return (
        <>
        <Breadcrumbs mainTitle={addUserTitle} parent={TeamTitle} title={addUserTitle} />
            <Container fluid>
                <Row>
                    <AddUserForm/>
                </Row>
            </Container>
        </>
    );
}

export default AddUserContainer;
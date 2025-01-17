import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle, EmployerTitle } from "@/Constant";
import { Container } from "reactstrap";

const EmployerDashboardContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={DashboardTitle} parent={EmployerTitle} title={DashboardTitle}/>
            <Container fluid>
            
            </Container>
        </>
    );
}

export default EmployerDashboardContainer;
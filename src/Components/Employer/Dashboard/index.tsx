import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, EmployerTitle } from "@/Constant";
import { Container } from "reactstrap";

const EmployerDashboardContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={EmployerTitle} parent={AdminTitle} title={EmployerTitle}/>
            <Container fluid>
                
            </Container>
        </>
    );
}

export default EmployerDashboardContainer;
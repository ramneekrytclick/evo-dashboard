import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle } from "@/Constant";
import { Card, CardBody, Container } from "reactstrap";

const CCDashboardContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={DashboardTitle}
				parent={"Course Creator"}
				title={DashboardTitle}
			/>
			<Container fluid>
				<Card>
					<CardBody>Hello Course Creator!</CardBody>
				</Card>
			</Container>
		</>
	);
};

export default CCDashboardContainer;

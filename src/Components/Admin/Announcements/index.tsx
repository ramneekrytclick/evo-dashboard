import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, AnnouncementsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AnnouncementsListTable from "./AnnouncementsListTable";

const AnnouncementsContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={AnnouncementsTitle}
				parent={AdminTitle}
				title={AnnouncementsTitle}
			/>
			<Container fluid>
				<AnnouncementsListTable />
			</Container>
		</>
	);
};

export default AnnouncementsContainer;

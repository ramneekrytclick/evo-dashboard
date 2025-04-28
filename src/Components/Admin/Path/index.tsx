import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, PathsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import PathsHeader from "./PathsHeader";
import PathCards from "./PathCards";

const PathPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={PathsTitle}
				parent={AdminTitle}
				title={PathsTitle}
			/>
			<Container fluid>
				<PathCards />
			</Container>
		</>
	);
};

export default PathPageContainer;

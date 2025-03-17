import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Container, Row } from "reactstrap";
import PathCards from "./PathCards";

const MyPathsContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"My Courses"}
				parent={"Student"}
				title={"My Courses"}
			/>
			<Container fluid>
				<Row>
					{/* <Col className="box-col-8"> */}
					<PathCards />
					{/* </Col> */}
				</Row>
			</Container>
		</>
	);
};

export default MyPathsContainer;

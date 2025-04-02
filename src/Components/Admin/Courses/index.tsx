import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, CoursesTitle } from "@/Constant";

import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CourseCards from "./CourseCards";
import CourseHeader from "./CourseHeader";

const CoursesPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={CoursesTitle}
				parent={AdminTitle}
				title={CoursesTitle}
			/>
			<Container fluid>
				<Row>
					<Col className="box-col-8">
						<Card color="light">
							<CardBody>
								<CourseHeader />
								<div style={{ height: "75vh", overflowY: "scroll" }}>
									<CourseCards />
								</div>
							</CardBody>
							<Row></Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CoursesPageContainer;

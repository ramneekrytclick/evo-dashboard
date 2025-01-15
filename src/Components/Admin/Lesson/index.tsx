import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateLessonForm from "./CreateLessonForm";
import { AddLessonTitle, LessonsTitle } from "@/Constant";

const CreateLessonContainer = () => {
    return (
        <div>
            <Breadcrumbs
				mainTitle={AddLessonTitle}
				parent={LessonsTitle}
				title={AddLessonTitle}
			/>
			<Container fluid>
				<Row>
					<Col xs={12}>
						<Card>
							<CardBody>
								<Row className="g-xl-5 g-3">
									<CreateLessonForm />
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
        </div>
    );
}

export default CreateLessonContainer;
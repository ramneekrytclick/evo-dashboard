import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AddMentorTitle, MentorTitle } from "@/Constant";
import { Container, Row } from "reactstrap";
import AddMentorForm from "./AddMentorForm";

const AddMentorContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={AddMentorTitle}
				parent={MentorTitle}
				title={AddMentorTitle}
			/>
			<Container fluid>
				<Row>
					<AddMentorForm />
				</Row>
			</Container>
		</>
	);
};

export default AddMentorContainer;

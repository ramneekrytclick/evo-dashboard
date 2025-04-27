import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Container } from "reactstrap";
import BatchCards from "./BatchCards";

const StudentBatchesContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"My Batches"}
				parent={"Student"}
				title={"Batches"}
			/>
			<Container
				fluid
				className='h-100'>
				<BatchCards />
			</Container>
		</>
	);
};

export default StudentBatchesContainer;

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Container } from "reactstrap";
import BatchCards from "./BatchCards";

const BatchesPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"My Batches"}
				parent={"Student"}
				title={"Batches"}
			/>
			<Container fluid>
				<BatchCards />
			</Container>
		</>
	);
};

export default BatchesPageContainer;

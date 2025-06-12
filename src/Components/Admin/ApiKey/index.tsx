import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ApiKeyListTable from "./ApiKeyListTable";

const ApiKeysContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Api Keys"}
				parent={AdminTitle}
				title={"Api Keys"}
			/>
			<Container fluid>
				<ApiKeyListTable />
			</Container>
		</>
	);
};

export default ApiKeysContainer;

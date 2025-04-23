import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { SupportTicket, SupportTicketList } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import TicketTable from "./TicketTable";
export function generateMetadata() {
	return {
		title: "Support Tickets",
		description: "View/Respond to user support requests and issues.",
	};
}
const SupportPageContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={SupportTicket}
				parent='Support'
				title='Tickets'
			/>
			<Container fluid>
				<Row>
					<Col xs={12}>
						<Card>
							<CardBody className='add-post'>
								<TicketTable />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SupportPageContainer;

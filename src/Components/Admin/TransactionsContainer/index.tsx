"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import TransactionsData from "./TransactionsData";
import {
	getTransactions,
	getTransactionsCSV,
} from "@/app/api/admin/transactions";

const TransactionsContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Transactions"}
				parent={AdminTitle}
				title={"Financial"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<Card>
							<CardBody>
								<Row>
									<Col sm={6}>
										<ExportCSV />
									</Col>
								</Row>
								<TransactionsData />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
const ExportCSV = () => {
	const exportCSV = async () => {
		try {
			const response = await getTransactionsCSV();
		} catch (error) {}
	};
	return (
		<>
			<Button
				color="primary"
				onClick={exportCSV}>
				Export Transactions CSV
			</Button>
		</>
	);
};

export default TransactionsContainer;

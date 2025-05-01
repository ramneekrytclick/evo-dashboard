import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import TransactionsTable from "./TransactionsTable";
import { Card, CardBody } from "reactstrap";

const TransactionsContainer = () => {
	return (
		<>
			<Breadcrumbs
				title='Transactions'
				mainTitle='Transactions'
				parent='Student'
			/>
			<Card>
				<CardBody>
					<TransactionsTable />
				</CardBody>
			</Card>
		</>
	);
};

export default TransactionsContainer;

import { Button, Card, CardBody, Table } from "reactstrap";
import { TransactionHistoryHeading } from "@/Constant";
import { Check, CheckCircle, Clock, Send } from "react-feather";
import dayjs from "dayjs";
import Link from "next/link";
import SVG from "@/CommonComponent/SVG";

interface Transaction {
	_id: string;
	amount: number;
	status: string;
	createdAt: string;
	course: {
		title: string;
	};
}

interface TransactionHistoryBodyProps {
	transactionsData: Transaction[];
}

interface TransactionHistoryProps {
	transactionsData: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
	transactionsData,
}) => {
	return (
		<Card className='transaction-history'>
			<CardBody>
				<div className='d-flex justify-content-between'>
					<h5>{TransactionHistoryHeading}</h5>
					<Link href={`/admin/transactions`}>
						<Button
							color='primary'
							className='px-3'
							outline>
							View All
						</Button>
					</Link>
				</div>
				<div className='custom-scrollbar pt-3'>
					<Table
						responsive
						className='display'
						style={{ width: "100%" }}>
						<tbody>
							<TransactionHistoryBody transactionsData={transactionsData} />
						</tbody>
					</Table>
				</div>
			</CardBody>
		</Card>
	);
};
const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "paid":
			return "success";
		case "pending":
			return "warning";
		case "rejected":
			return "danger";
		default:
			return "primary";
	}
};

const TransactionHistoryBody: React.FC<TransactionHistoryBodyProps> = ({
	transactionsData,
}) => {
	return (
		<div className='transaction-history custom-scrollbar'>
			{transactionsData.slice(0, 4).map((txn, i) => (
				<div
					className='d-flex align-items-start mb-3'
					key={txn._id}>
					<div>
						<span
							className={`bg-light-${getStatusColor(
								txn.status
							)} history rounded-circle p-1`}
							style={{
								width: "40px",
								height: "40px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}>
							{txn.status === "Paid" ? (
								<CheckCircle className={`text-${getStatusColor(txn.status)}`} />
							) : (
								<Clock className={`text-${getStatusColor(txn.status)}`} />
							)}
						</span>
					</div>
					<div className='flex-grow-1 ms-3 border-bottom'>
						<Link href='/admin/transactions'>
							<div className='d-flex justify-content-between'>
								<strong
									className={`d-block fs-6 text-${getStatusColor(txn.status)}`}>
									₹{txn.amount}
								</strong>
								<small className='text-muted'>{txn.course.title}</small>
							</div>
							<div>
								<small className='text-muted'>
									{dayjs(txn.createdAt).format("MMM DD, YYYY, h:mm A")}
								</small>
							</div>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default TransactionHistory;

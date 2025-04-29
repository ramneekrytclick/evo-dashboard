import { Col, Row } from "reactstrap";
import TotalEarnings from "./TotalEarnings";
import RecentTransactions from "./RecentTransactions";
import CoursesCard from "./CoursesCard";

const Transactions = ({
	transactionsData,
	coursesData,
	category,
}: {
	transactionsData: any;
	coursesData: any;
	category: any;
}) => {
	return (
		<>
			<Col
				md={4}
				className='col-xl-25 box-col-3 h-100'>
				<TotalEarnings transactionsData={transactionsData} />
			</Col>
			<Col
				md={4}
				className='col-xl-25 box-col-3'>
				<RecentTransactions transactionsData={transactionsData} />
			</Col>
			<Col
				md={4}
				className='col-xl-25 box-col-3'>
				<CoursesCard
					courseData={coursesData}
					category={category}
				/>
			</Col>
		</>
	);
};

export default Transactions;

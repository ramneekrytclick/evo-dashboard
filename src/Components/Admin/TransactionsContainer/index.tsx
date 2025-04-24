"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, TeamTitle } from "@/Constant";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import TransactionsData from "./TransactionsData";
import {
	getTransactions,
	getTransactionsCSV,
} from "@/app/api/admin/transactions";
import { toast } from "react-toastify";
import { useState } from "react";

const TransactionsContainer = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<any[]>([]);
	const fetchData = async () => {
		try {
			const response = await getTransactions();
			setData(response.transactions || []);
		} catch (err) {
			toast.error("Error fetching transactions");
		} finally {
			setLoading(false);
		}
	};
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
										<ExportCSV data={data} />
									</Col>
								</Row>
								<TransactionsData
									data={data}
									setData={setData}
									fetchData={fetchData}
									loading={loading}
									setLoading={setLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

const ExportCSV = ({ data }: { data: any[] }) => {
	const exportCSV = () => {
		if (!data.length) {
			toast.error("No transactions available to export.");
			return;
		}

		// Create CSV headers
		const headers = [
			"User Name",
			"Email",
			"Course Title",
			"Amount (₹)",
			"Status",
			"Date",
		];

		// Map each transaction to a CSV row
		const rows = data.map((row) => [
			row.user?.name || "Guest",
			row.user?.email || "N/A",
			row.course?.title || "N/A",
			row.amount,
			row.status,
			new Date(row.createdAt).toLocaleString(),
		]);

		const csvContent = [headers, ...rows]
			.map((e) => e.map((cell) => `"${cell}"`).join(","))
			.join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "transactions.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		toast.success("CSV exported successfully");
	};

	return (
		<Button
			color='primary'
			onClick={exportCSV}>
			Export Transactions CSV
		</Button>
	);
};

export default TransactionsContainer;

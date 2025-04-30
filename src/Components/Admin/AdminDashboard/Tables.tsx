import Link from "next/link";
import { Button, Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";

const Tables = ({ tables, renderTable }: any) => {
	return (
		<>
			{tables.map(({ title, data, fields, link, onClick }: any, index: any) => (
				<Col
					md={6}
					xl={6}
					className='h-100'
					key={index}>
					<Card
						className='shadow-sm border-0'
						style={{ height: "30em", overflow: "hidden" }}>
						<CardHeader className='d-flex justify-content-between align-items-center'>
							<CardTitle
								tag='h6'
								className='fw-medium'>
								{title}
							</CardTitle>
							<Link href={link}>
								<Button
									color='primary'
									className='px-3'
									outline>
									View All
								</Button>
							</Link>
						</CardHeader>
						<CardBody
							style={{
								overflow: "auto",
								height: "calc(100% - 4.5rem)",
								cursor: "pointer",
							}}>
							{renderTable(data.reverse(), fields, onClick)}
						</CardBody>
					</Card>
				</Col>
			))}
		</>
	);
};

export default Tables;

import {
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Col,
	Badge,
	Card,
	CardBody,
	Button,
} from "reactstrap";
import { BatchProps } from "@/Types/Course.type";
import Link from "next/link";
const BatchDetails = ({
	batch,
	isOpen,
	toggle,
}: {
	batch: BatchProps;
	isOpen: boolean;
	toggle: () => void;
}) => {
	const courseDisplay = () => {
		if (!batch.course) return "—";

		if (typeof batch.course === "string") {
			return <code>{batch.course}</code>;
		}

		return (
			<>
				<p>
					<span className='fw-semibold'>Course Title:</span>{" "}
					<Link
						href={`/admin/course/${batch.course._id}`}
						className='text-decoration-underline fw-bold text-primary'
						target='_blank'>
						{batch.course.title}
					</Link>
				</p>
				<p>
					<span className='fw-semibold'>Course ID:</span>{" "}
					<code>{batch.course._id}</code>
				</p>
			</>
		);
	};

	const formattedDate = (dateStr?: string) =>
		dateStr
			? new Date(dateStr).toLocaleDateString("en-IN", {
					year: "numeric",
					month: "short",
					day: "numeric",
			  })
			: "—";

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size='lg'>
			<ModalHeader toggle={toggle}>Batch Details - {batch.name}</ModalHeader>
			<ModalBody>
				<Card className='shadow-sm border-0 mb-4'>
					<CardBody>
						<Row>
							<Col md='7'>
								<Row className='mb-3'>
									<Col md='6'>
										<p>
											<strong>Description:</strong> {batch.description || "—"}
										</p>
										<p>
											<strong>Time:</strong> {batch.time || "—"}
										</p>
										<p>
											<strong>Days:</strong> {batch.batchWeekType || "—"}
										</p>
									</Col>
									<Col md='6'>
										<p>
											<strong>Start Date:</strong>{" "}
											{formattedDate(batch.startDate)}
										</p>
										<p>
											<strong>End Date:</strong> {formattedDate(batch.endDate)}
										</p>
										<p>
											<strong>Students:</strong>{" "}
											<Badge
												color='info'
												pill>
												{batch.students?.length || 0}
											</Badge>
										</p>
									</Col>
								</Row>

								<hr />

								<Row>
									<Col md='6'>
										<h6 className='fw-semibold mb-2'>Mentor Details</h6>
										{typeof batch.mentor === "object" && batch.mentor ? (
											<>
												<p>
													<strong>Name:</strong> {batch.mentor.name}
												</p>
												<p>
													<strong>Email:</strong> {batch.mentor.email}
												</p>
											</>
										) : (
											<p>
												<Badge color='warning'>Unassigned</Badge>
											</p>
										)}
									</Col>

									<Col md='6'>
										<h6 className='fw-semibold mb-2'>Course Details</h6>
										{courseDisplay()}
									</Col>
								</Row>
							</Col>

							<Col
								md='5'
								className='border-start ps-4'>
								<h6 className='fw-semibold mb-3'>Assigned Students</h6>
								<div style={{ maxHeight: "260px", overflowY: "auto" }}>
									{batch.students && batch.students.length > 0 ? (
										<ul className='ps-3 mb-0'>
											{batch.students.map((student: any) => (
												<li key={student._id}>
													<strong>{student.name}</strong>{" "}
													<small className='text-muted'>
														({student.email})
													</small>
												</li>
											))}
										</ul>
									) : (
										<p className='text-muted'>No students assigned.</p>
									)}
								</div>
							</Col>
						</Row>
					</CardBody>
					<Link href={`/admin/batches/slug/${batch.slug}`}>
						<Button
							color='primary'
							className='rounded-pill'>
							View Batch
						</Button>
					</Link>
				</Card>
			</ModalBody>
		</Modal>
	);
};

export default BatchDetails;

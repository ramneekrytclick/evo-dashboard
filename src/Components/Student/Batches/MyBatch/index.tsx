"use client";
import { useEffect, useState } from "react";
import { getBatchByID } from "@/app/api/student";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	CardHeader,
	Row,
	Col,
} from "reactstrap";
import GroupChat from "./GroupChat";
import BookSessionForm from "./BookSessionForm"; // Ensure correct path
import { BatchProps } from "@/Types/Course.type";
import { Info } from "react-feather";

const MyBatchContainer = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<BatchProps>();
	const [modalOpen, setModalOpen] = useState(false);

	const fetchData = async () => {
		const response = await getBatchByID(id);
		setBatch(response.batch);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const toggleModal = () => setModalOpen(!modalOpen);

	if (!batch) return <p>Loading...</p>;

	return (
		<>
			<Breadcrumbs
				mainTitle={`Batch: ${batch.name}`}
				parent={"Batches"}
				title={`Batch: ${batch.name}`}
			/>
			<Card
				color='light'
				style={{ height: "80vh", gap: 0 }}>
				<Row style={{ height: "100%", gap: 0 }}>
					{/* Left: Group Chat */}
					<Col
						sm={12}
						lg={10}
						className='h-100'>
						<GroupChat
							batchId={id}
							batch={batch}
						/>
					</Col>

					{/* Right: Mentor Card */}
					<Col
						sm={12}
						lg={2}
						className='d-flex flex-column justify-content-start align-items-start h-100 align-items-center pt-5'
						style={{
							height: "100%",
							overflowY: "auto",
						}}>
						<Card className='shadow-sm bg-light-subtle text-dark text-center rounded-4 p-3'>
							<p className='text-dark-subtle fw-light d-flex align-items-center justify-content-center gap-2'>
								<Info size={15} />
								Batch Details
							</p>
							<h3 className='fw-bold'>{batch.name}</h3>
							<p className='text-muted mb-2'>{batch.description}</p>

							<div className='mb-3'>
								<p className='mb-0'>
									{new Date(batch.startDate || new Date()).toLocaleDateString(
										"en-IN",
										{
											day: "numeric",
											month: "short",
											year: "numeric",
										}
									)}
									-
									{new Date(batch.endDate || new Date()).toLocaleDateString(
										"en-IN",
										{
											day: "numeric",
											month: "short",
											year: "numeric",
										}
									)}
								</p>
							</div>
							<p className='mb-0'>
								<strong>Timings:</strong> {batch.time} {batch.batchWeekType}
							</p>
						</Card>

						<Card className='shadow-sm bg-light-subtle text-dark text-center rounded-4 p-3'>
							<h6 className='text-dark fw-bold mb-3'>Today's Class</h6>
							{
								<p className='text-muted text-center mt-3'>
									{" "}
									Not scheduled yet.
								</p>
							}
							{batch.scheduledSessions ? (
								batch.scheduledSessions?.length > 0 ? (
									<>
										{batch.scheduledSessions
											.filter(
												(s) =>
													new Date(s.date).toDateString() ===
													new Date().toDateString()
											)
											.map((session, idx) => (
												<div
													key={idx}
													className='text-dark fs-4'>
													<p className='mb-1 text-dark'>
														<strong>Topic:</strong>{" "}
														{session.topic || "Not specified"}
													</p>
													<p className='mb-1'>
														<strong>Time:</strong>{" "}
														{session.time || "Not specified"}
													</p>
													<p className='mb-1'>
														<strong>Date:</strong>{" "}
														{new Date(session.date).toDateString() ||
															"Not specified"}
													</p>
													<Button
														color='info'
														className='my-1'
														onClick={() => window.open(session.link, "_blank")}>
														Join
													</Button>
													<p className='text-dark fw-bold'>
														Note from Mentor:{" "}
														<span className='text-muted fw-light'>
															{session.comment}
														</span>
													</p>
												</div>
											))}
									</>
								) : (
									<p className='text-muted text-center mt-3'>
										{" "}
										Not scheduled yet.
									</p>
								)
							) : (
								<p className='text-muted text-center mt-3'>
									{" "}
									Not scheduled yet.
								</p>
							)}
						</Card>

						<Card className='shadow-sm bg-light-subtle text-dark text-center rounded-4 '>
							<CardBody>
								<p className='mb-3 text-muted'>Mentor Details</p>
								<CardTitle
									tag='h5'
									className='fw-semibold fs-4'>
									{batch.mentor?.name}
								</CardTitle>
								<CardText>{batch.mentor?.email}</CardText>
								<Button
									color='info'
									block
									onClick={toggleModal}>
									Book 1:1 Session
								</Button>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Card>

			{/* Modal for Booking Session */}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}>
				<ModalHeader toggle={toggleModal}>Book Mentor Session</ModalHeader>
				<ModalBody>
					<BookSessionForm
						toggle={toggleModal}
						mentorIdProp={batch.mentor?._id || ""}
					/>
				</ModalBody>
			</Modal>
		</>
	);
};

export default MyBatchContainer;

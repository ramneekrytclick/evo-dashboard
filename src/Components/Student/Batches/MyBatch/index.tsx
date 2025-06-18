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
	Badge,
	Spinner,
} from "reactstrap";
import GroupChat from "./GroupChat";
import BookSessionForm from "./BookSessionForm"; // Ensure correct path
import { BatchProps } from "@/Types/Course.type";
import { Info } from "react-feather";
import Link from "next/link";
import { toast } from "react-toastify";

const MyBatchContainer = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<BatchProps>();
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getBatchByID(id);
			setBatch(response.batch);
		} catch (error) {
			toast.error("Error fetching batch details");
			console.error("Error fetching batch details:", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const toggleModal = () => setModalOpen(!modalOpen);

	if (loading) {
		return (
			<div className='text-center py-5'>
				<Spinner color='primary' />
				<p className='mt-3'>Loading batch data...</p>
			</div>
		);
	}
	if (!batch)
		return (
			<p className='text-center mt-4'>No batch found with the provided ID.</p>
		);

	return (
		<>
			<Breadcrumbs
				mainTitle={`Batch: ${batch.name}`}
				parent={"Batches"}
				title={`Batch: ${batch.name}`}
			/>
			<Row>
				<Col
					sm={12}
					lg={2}
					className='left-sidebar-wrapper rounded-4 order-2 order-lg-1'
					style={{ height: "85vh", overflow: "auto" }}>
					<div className='chat-options-tab'>
						<Card className='shadow-sm text-dark text-center rounded-4 p-3'>
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
								{batch.time} {batch.batchWeekType}
							</p>
						</Card>

						<Card className='shadow-sm bg-light-subtle text-dark text-center rounded-4 p-3'>
							<h6 className='text-dark fw-bold mb-3'>Today's Class</h6>
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
													<div className='d-flex flex-column justify-content-center align-items-center text-center'>
														<h6 className='fw-semibold'>{session.topic}</h6>
													</div>

													<div className='d-flex flex-column justify-content-center align-items-center text-center'>
														<span>{session.comment || "No comment"}</span>
													</div>
													<Badge
														color='light'
														className='text-dark d-flex justify-content-center gap-2 fs-6'>
														<span>
															{new Date(session.date).toLocaleDateString()}
														</span>
														{session.time}
													</Badge>
													<Link
														href={session.link}
														target='_blank'>
														<Button
															outline
															color='dark'>
															Join Session
														</Button>
													</Link>
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
					</div>
				</Col>
				<Col
					sm={12}
					lg={10}
					className='order-1 order-lg-2'>
					<GroupChat
						batchId={id}
						batch={batch}
					/>
				</Col>
			</Row>

			<BookSessionForm
				modalOpen={modalOpen}
				toggle={toggleModal}
				mentorIdProp={batch.mentor?._id || ""}
			/>
		</>
	);
};

export default MyBatchContainer;

"use client";

import { useEffect, useState } from "react";
import { getBatchByID } from "@/app/api/mentor";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import {
	Badge,
	Button,
	ButtonGroup,
	Card,
	Col,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Spinner,
} from "reactstrap";
import GroupChat from "./GroupChat";
import { BatchProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";
import { toast } from "react-toastify";
import { Edit2, Info, Trash, X } from "react-feather";

const MentorBatchContainer = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<BatchProps>();
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [link, setLink] = useState("");
	const [topic, setTopic] = useState("");
	const [comment, setComment] = useState("");
	const [selectedSession, setSelectedSession] = useState<any>(null);
	const [time, setTime] = useState("00:22");
	const [cancelModalOpen, setCancelModalOpen] = useState(false);
	const [cancelSessionId, setCancelSessionId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await getBatchByID(id);
			setBatch(response.batch);
		} catch (error) {
			toast.error("Error fetching batch details");
		} finally {
			setLoading(false);
		}
	};
	const confirmCancel = (sessionId: string) => {
		setCancelSessionId(sessionId);
		setCancelModalOpen(true);
	};
	const handleSchedule = async () => {
		try {
			await apiClient.post("/chat/mentor/schedule", {
				batchId: id,
				link,
				topic,
				comment,
				time,
			});
			toast.success("Session scheduled for today!");
			setModalOpen(false);
			fetchData();
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Error scheduling session");
		}
	};

	const handleEditSession = async (sessionId: string, time: string) => {
		if (!selectedSession) return;
		try {
			await apiClient.put(`/chat/mentor/schedule/update`, {
				batchId: id,
				sessionId,
				link,
				topic,
				comment,
				time,
			});
			toast.success("Session updated successfully!");
			setEditModalOpen(false);
			fetchData();
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Failed to update session");
		}
	};

	const handleConfirmCancel = async () => {
		if (!cancelSessionId) return;
		try {
			await apiClient.delete(
				`/chat/mentor/schedule/cancel/${id}/${cancelSessionId}`
			);
			toast.success("Session cancelled successfully");
			setCancelModalOpen(false);
			fetchData();
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Error cancelling session");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleEditOpen = (session: any) => {
		setSelectedSession(session);
		setLink(session.link);
		setTopic(session.topic);
		setComment(session.comment);
		setEditModalOpen(true);
	};
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

	const todaySession = batch.scheduledSessions?.find(
		(s) => new Date(s.date).toDateString() === new Date().toDateString()
	);

	return (
		<>
			<Breadcrumbs
				mainTitle={`Batch: ${batch.name}`}
				parent='Batches'
				title={`${batch.name}`}
			/>
			<Row style={{ height: "80%", gap: 0 }}>
				<Col
					sm={12}
					lg={2}
					className='d-flex flex-column justify-content-start align-items-start h-100 align-items-center pt-5 order-2 order-lg-1'>
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

					{todaySession ? (
						<Card className='shadow-sm bg-light-subtle text-dark text-center mt-3 p-3'>
							<h6 className='text-dark fw-bold mb-3'>Scheduled for Today</h6>
							<div className='d-flex flex-column justify-content-center align-items-center text-center'>
								<h6 className='fw-semibold'>{todaySession.topic}</h6>
							</div>

							<div className='d-flex flex-column justify-content-center align-items-center text-center'>
								<span>{todaySession.comment || "No comment"}</span>
							</div>
							<Badge
								color='light'
								className='text-dark d-flex justify-content-center gap-2 fs-6'>
								<span>{new Date(todaySession.date).toLocaleDateString()}</span>
								{todaySession.time}
							</Badge>
							<div className='d-flex flex-column align-items-center justify-content-center gap-3'>
								<Button
									outline
									color='dark'
									className='w-100'
									onClick={() => window.open(todaySession.link, "_blank")}>
									Join
								</Button>
								<ButtonGroup>
									<Button
										color='success'
										size='sm'
										className='p-2'
										onClick={() => handleEditOpen(todaySession)}>
										<Edit2 size={16} />
									</Button>
									<Button
										color='danger'
										size='sm'
										className='p-2'
										onClick={() => confirmCancel(todaySession._id)}>
										<X size={16} />
									</Button>
								</ButtonGroup>
							</div>
						</Card>
					) : (
						<>
							<Button
								color='info'
								block
								onClick={() => setModalOpen(true)}
								disabled={!!todaySession}>
								Schedule Today’s Class
							</Button>
							<p className='text-muted text-center mt-3'>Not scheduled yet.</p>
						</>
					)}
				</Col>
				<Col
					sm={12}
					lg={10}
					className='h-100 order-1 order-lg-2'>
					<GroupChat
						batchId={id}
						batch={batch}
					/>
				</Col>
			</Row>
			{/* Schedule Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setModalOpen(false)}>
					Schedule Today’s Session
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label>Session Link</Label>
						<Input
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Topic</Label>
						<Input
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Comment / Notes</Label>
						<Input
							type='textarea'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Class Time</Label>
						<Input
							type='time'
							defaultValue={batch.time}
							value={time}
							onChange={(e) => setTime(e.target.value)}
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={() => setModalOpen(false)}>
						Cancel
					</Button>
					<Button
						color='success'
						onClick={handleSchedule}
						disabled={!link.trim()}>
						Schedule
					</Button>
				</ModalFooter>
			</Modal>

			{/* Edit Modal */}
			<Modal
				isOpen={editModalOpen}
				toggle={() => setEditModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setEditModalOpen(false)}>
					Edit Scheduled Session
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label>Session Link</Label>
						<Input
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Topic</Label>
						<Input
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Comment / Notes</Label>
						<Input
							type='textarea'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Class Time</Label>
						<Input
							type='time'
							value={time}
							onChange={(e) => setTime(e.target.value)}
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						onClick={() => setEditModalOpen(false)}>
						Close
					</Button>
					<Button
						color='primary'
						onClick={() =>
							handleEditSession(selectedSession._id, selectedSession.time)
						}
						disabled={!link.trim()}>
						Update
					</Button>
				</ModalFooter>
			</Modal>
			{/* Confirm Cancel Modal */}
			<Modal
				isOpen={cancelModalOpen}
				toggle={() => setCancelModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setCancelModalOpen(false)}>
					Confirm Cancellation
				</ModalHeader>
				<ModalBody>
					Are you sure you want to cancel today’s scheduled session? This action
					cannot be undone.
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={() => setCancelModalOpen(false)}>
						No, Keep it
					</Button>
					<Button
						color='danger'
						onClick={handleConfirmCancel}>
						Yes, Cancel Session
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default MentorBatchContainer;

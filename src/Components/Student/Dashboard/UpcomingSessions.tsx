"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	Modal,
	ModalHeader,
	ModalBody,
	Button,
	Badge,
} from "reactstrap";
import { getMyUpcomingSessions } from "@/app/api/student";
import { toast } from "react-toastify";
import Link from "next/link";
const UpcomingSessions = ({
	loading,
	setLoading,
}: {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [events, setEvents] = useState<any[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<any>(null);

	const toggleModal = () => setModalOpen(!modalOpen);

	const fetchSessions = async () => {
		try {
			const res = await getMyUpcomingSessions();
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const upcoming = res.upcomingSessions.filter(
				(s: any) => new Date(s.date) >= today
			);

			const formatted = upcoming.map((s: any) => {
				const start = new Date(s.date);
				const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour

				return {
					title: s.topic || "Session",
					start,
					end,
					extendedProps: s,
					className: "bg-primary fw-bold",
				};
			});

			setEvents(formatted);
		} catch (error) {
			toast.error("Error fetching upcoming sessions.");
		}
	};

	useEffect(() => {
		fetchSessions();
	}, []);

	return (
		<>
			<Card className='shadow-sm border-0 rounded-4'>
				<Card>
					<CardHeader className='fw-bold text-muted fs-5'>
						Today's Schedule
					</CardHeader>
					<CardBody
						style={{ height: "300px", overflowY: "auto", cursor: "pointer" }}>
						<FullCalendar
							plugins={[timeGridPlugin, interactionPlugin]}
							themeSystem='bootstrap5'
							initialView='timeGridDay'
							allDaySlot={false}
							events={events}
							eventClick={(info: any) => {
								setSelectedEvent(info.event.extendedProps);
								setModalOpen(true);
							}}
							height='auto'
							slotMinTime='00:00:00'
							slotMaxTime='23:59:59'
						/>
					</CardBody>
				</Card>
			</Card>

			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered
				size='md'>
				<ModalHeader toggle={toggleModal}>Class Details</ModalHeader>
				<ModalBody>
					{selectedEvent && (
						<div className='d-flex flex-column gap-3 align-items-center'>
							<div className='d-flex flex-column justify-content-center align-items-center text-center'>
								<h5 className='fw-semibold'>{selectedEvent.topic}</h5>
								<p className='text-muted'>{selectedEvent.batchName}</p>
							</div>

							<div className='d-flex flex-column justify-content-center align-items-center text-center'>
								<span>{selectedEvent.comment || "No comment"}</span>
							</div>
							<Badge
								color='light'
								className='text-dark d-flex justify-content-center gap-2 fs-6'>
								<span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
								{selectedEvent.time}
							</Badge>
							<Link
								href={selectedEvent.link}
								target='_blank'>
								<Button
									outline
									color='dark'>
									Join Session
								</Button>
							</Link>
						</div>
					)}
				</ModalBody>
			</Modal>
		</>
	);
};

export default UpcomingSessions;

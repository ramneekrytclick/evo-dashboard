import Link from "next/link";
import { useState } from "react";
import {
	Card,
	CardBody,
	CardTitle,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	Button,
} from "reactstrap";

const SessionBookingCard = ({ booking }: { booking: any }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const getStatusStep = (status: "Pending" | "Confirmed" | "Cancelled") => {
		const steps = {
			Pending: {
				title: "Session Requested",
				detail: "Waiting for mentor response.",
				color: "warning",
			},
			Confirmed: {
				title: "Session Confirmed",
				detail: "Mentor has confirmed your session.",
				color: "success",
			},
			Cancelled: {
				title: "Session Cancelled",
				detail: "Mentor has rejected the session.",
				color: "danger",
			},
		};
		if (["Pending", "Confirmed", "Cancelled"].includes(status)) {
			return steps[status];
		}
		return steps.Pending;
	};

	const step = getStatusStep(booking.status);
	const sessionLink = booking?.replyFromMentor?.split("https://");

	return (
		<>
			<Card
				key={booking._id}
				onClick={() => setModalOpen(true)}
				className='flex-shrink-0 p-3 border shadow-sm rounded-4 bg-white text-dark text-center'
				style={{ width: "280px", scrollSnapAlign: "start", cursor: "pointer" }}>
				<CardBody className='p-0 d-flex flex-column h-100 justify-content-between align-items-center'>
					{/* Status Indicator */}
					<div className='d-flex mb-3 text-start'>
						<div
							className={`flex-shrink-0 bg-${step.color} rounded-circle`}
							style={{ width: 30, height: 30 }}></div>
						<div className='flex-grow-1 ps-3'>
							<h6 className='fw-bold mb-1 fs-5'>{step.title}</h6>
							<p className='small text-muted mb-0 fs-6'>{step.detail}</p>
						</div>
					</div>

					{/* Session Info */}
					<div className='mt-auto'>
						<p className='mb-1 small text-dark'>
							<strong>Topic:</strong> {booking.message || "—"}
						</p>
						<Badge
							pill
							color='light'
							className='text-dark d-flex justify-content-center gap-2 fs-6'>
							<span>{new Date(booking.date).toLocaleDateString()}</span>
							{booking.timeSlot}
						</Badge>
					</div>
				</CardBody>
			</Card>

			{/* Modal for full session details */}
			<Modal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}
				centered
				size='md'>
				<ModalHeader toggle={() => setModalOpen(false)}>
					<span className='fw-semibold'>
						{booking.message || "Session Details"}
					</span>
				</ModalHeader>
				<ModalBody className='text-center d-flex flex-column align-items-center justify-content-center gap-2'>
					<Badge
						pill
						color='light'
						className='text-dark d-flex justify-content-center gap-2 fs-6'>
						<span>{new Date(booking.date).toLocaleDateString()}</span>
						{booking.timeSlot}
					</Badge>
					<span className='d-flex flex-column align-items-center justify-content-center'>
						<strong>Mentor</strong>{" "}
						{`${booking.mentor.name} ( ${booking.mentor.email} ) ` || "—"}
					</span>
					<span className='d-flex flex-column align-items-center justify-content-center my-4'>
						<strong>Reply from Mentor</strong>{" "}
						<span className='text-muted'>
							{booking.replyFromMentor || "No reply yet"}
						</span>
					</span>
					{step.title === "Session Confirmed" ? (
						<>
							<Button
								color='primary'
								tag={Link}
								href={sessionLink}>
								JOIN MEET
							</Button>
							<div
								className={`flex-shrink-0 bg-light text-${step.color} rounded-pill p-2 px-3 mt-3 cursor-pointer`}>
								{step.title}
							</div>
						</>
					) : (
						<>
							<div
								className={`flex-shrink-0 bg-light text-${step.color} rounded-pill p-2 px-3 mt-3`}>
								{step.title}
							</div>
						</>
					)}
				</ModalBody>
			</Modal>
		</>
	);
};

export default SessionBookingCard;

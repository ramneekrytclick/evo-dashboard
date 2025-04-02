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
} from "reactstrap";
import GroupChat from "./GroupChat";
import BookSessionForm from "./BookSessionForm"; // Ensure correct path

const MyBatchContainer = ({ id }: { id: string }) => {
	const [batch, setBatch] = useState<any>(null);
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
				mainTitle={"Batch"}
				parent={"Batches"}
				title={"Batch"}
			/>
			<Card>
				<div
					className="d-flex"
					style={{ height: "75vh" }}>
					{/* Left: Group Chat */}
					<GroupChat />

					{/* Right: Mentor Card */}
					<Card className="shadow-sm bg-light text-dark rounded-0">
						<CardBody>
							<CardTitle tag="h5">{batch.mentor?.name}</CardTitle>
							<CardText>
								<strong>Email:</strong> {batch.mentor?.email}
							</CardText>
							<Button
								color="primary"
								block
								onClick={toggleModal}>
								Book 1:1 Session
							</Button>
						</CardBody>
					</Card>
				</div>
			</Card>

			{/* Modal for Booking Session */}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}>
				<ModalHeader toggle={toggleModal}>Book Mentor Session</ModalHeader>
				<ModalBody>
					<BookSessionForm
						toggle={toggleModal}
						mentorIdProp={batch.mentor?._id}
					/>
				</ModalBody>
			</Modal>
		</>
	);
};

export default MyBatchContainer;

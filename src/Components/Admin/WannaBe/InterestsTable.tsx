"use client";
import {
	deleteWannaBeInterest,
	getWannaBeInterests,
} from "@/app/api/admin/wannabe";
import { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import { FaTrash } from "react-icons/fa";

const InterestsTable = ({
	fetchData,
	interests,
}: {
	fetchData: () => void;
	interests: any[];
}) => {
	useEffect(() => {
		fetchData();
	}, []);

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedInterest, setSelectedInterest] = useState<{ _id: string }>({
		_id: "",
	});

	const toggleModal = () => setModalOpen(!modalOpen);

	const openModal = (interest: any) => {
		setSelectedInterest(interest);
		toggleModal();
	};

	const onSubmit = async () => {
		toggleModal();
		await deleteWannaBeInterest(selectedInterest._id);
		fetchData();
	};

	return (
		<div className="p-4">
			<Row className="g-3">
				{interests.map((interest) => (
					<Col
						key={interest._id}
						xl={2}
						md={3}>
						<Card className="position-relative">
							<CardHeader className="fw-bold">{interest.name}</CardHeader>
							<CardBody className="text-muted text-sm">
								Created: {new Date(interest.createdAt).toLocaleString()}
							</CardBody>
							<CardFooter className="text-end">
								<Button
									color="danger"
									size="sm"
									title="Delete Interest"
									onClick={() => openModal(interest)}>
									<FaTrash />
								</Button>
							</CardFooter>
						</Card>
					</Col>
				))}
			</Row>

			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered>
				<ModalHeader toggle={toggleModal}>Confirm Delete Interest</ModalHeader>
				<ModalBody>Do you want to delete this interest?</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						onClick={toggleModal}>
						Cancel
					</Button>
					<Button
						color="danger"
						onClick={onSubmit}>
						Yes, Delete
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default InterestsTable;

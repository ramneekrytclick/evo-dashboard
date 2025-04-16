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
import Image from "next/image";
const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

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
		<div className='p-4'>
			<Row className='g-3'>
				{interests.length === 0 && (
					<Col>No Interests Found, Please create new</Col>
				)}
				{interests.map((interest) => (
					<Col
						key={interest._id}
						xl={3}
						md={4}
						sm={6}>
						<Card className='shadow-sm border-0 rounded-3 overflow-hidden h-100'>
							{interest.image && (
								<div className='position-relative'>
									<Image
										src={backendURL + "/" + interest.image}
										alt={interest.title}
										width={400}
										height={200}
										style={{
											width: "100%",
											height: "200px",
											objectFit: "cover",
										}}
									/>
									<div
										className='position-absolute bottom-0 start-0 w-100 px-3 py-2'
										style={{
											background: "rgba(0, 0, 0, 0.5)",
											color: "#fff",
											fontWeight: 600,
										}}>
										{interest.title}
									</div>
								</div>
							)}
							<CardBody>
								{interest.description && (
									<p className='text-secondary small mb-2'>
										{interest.description}
									</p>
								)}
								<p className='text-muted small mb-0'>
									Created: {new Date(interest.createdAt).toLocaleString()}
								</p>
							</CardBody>
							<CardFooter className='bg-transparent border-top-0 text-end'>
								<Button
									color='danger'
									size='sm'
									title='Delete Interest'
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
						color='secondary'
						onClick={toggleModal}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={onSubmit}>
						Yes, Delete
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default InterestsTable;

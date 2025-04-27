"use client";
import {
	deleteWannaBeInterest,
	getWannaBeInterests,
} from "@/app/api/admin/wannabe";
import { useEffect, useState } from "react";
import {
	Button,
	ButtonGroup,
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
import { getImageURL } from "@/CommonComponent/imageURL";
import { Edit2, Trash, Trash2 } from "react-feather";
import UpdateInterestModal from "./UpdateModal";

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
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [interestToUpdate, setInterestToUpdate] = useState<any>(null);
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
										src={getImageURL(interest.image)}
										alt={interest.title}
										width={400}
										height={200}
										style={{
											width: "100%",
											height: "200px",
											objectFit: "cover",
										}}
									/>
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
							<CardFooter className='bg-transparent border-top-0 text-end d-flex justify-content-end gap-2'>
								<ButtonGroup>
									<Button
										color='success'
										size='sm'
										className='p-2'
										onClick={() => {
											setInterestToUpdate(interest);
											setUpdateModalOpen(true);
										}}>
										<Edit2 size={16} />
									</Button>
									<Button
										color='danger'
										size='sm'
										className='p-2'
										onClick={() => openModal(interest)}>
										<Trash size={16} />
									</Button>
								</ButtonGroup>
							</CardFooter>
						</Card>
					</Col>
				))}
			</Row>
			{updateModalOpen && interestToUpdate && (
				<UpdateInterestModal
					isOpen={updateModalOpen}
					toggle={() => setUpdateModalOpen(false)}
					interest={interestToUpdate}
					fetchData={fetchData}
				/>
			)}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}
				centered>
				<ModalHeader toggle={toggleModal}>Confirm Delete Interest</ModalHeader>
				<ModalBody>Do you want to delete this interest?</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
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

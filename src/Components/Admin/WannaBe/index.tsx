"use client";

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle } from "@/Constant";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import InterestsTable from "./InterestsTable";
import { useState } from "react";
import CreateInterestFormModal from "./CreateInterestFormModal";
import {
	createWannaBeInterest,
	getWannaBeInterests,
} from "@/app/api/admin/wannabe";
import { toast } from "react-toastify";

const WannaBeContainer: React.FC = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const toggleModal = () => setModalOpen(!modalOpen);
	const [interests, setInterests] = useState([]);
	const fetchData = async () => {
		try {
			const response = await getWannaBeInterests();
			setInterests(response);
		} catch (error) {
			console.error("Error fetching interests:", error);
		}
	};

	const handleSubmit = async (formData: FormData): Promise<void> => {
		try {
			await createWannaBeInterest(formData);
			fetchData();
			toast.success("Created Successfully!");
		} catch (error: any) {
			console.error("Submission error:", error.message);
			toast.error("Failed to create Wanna Be Interest! Try Again!");
		}
	};

	return (
		<>
			<Breadcrumbs
				mainTitle={"Wanna Be Interests"}
				parent={AdminTitle}
				title={"Wanna Be Interests"}
			/>
			<Container fluid>
				<Row>
					<Col sm={12}>
						<Card>
							<CardBody>
								<div className='list-product-header'>
									<Button
										color='primary'
										className='py-2 px-4'
										onClick={toggleModal}>
										<i className='fa fa-plus me-2' />
										Add WannaBeInterest
									</Button>
								</div>
								<InterestsTable
									fetchData={fetchData}
									interests={interests}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<CreateInterestFormModal
				modalOpen={modalOpen}
				toggleModal={toggleModal}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default WannaBeContainer;

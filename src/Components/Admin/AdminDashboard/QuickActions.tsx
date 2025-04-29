import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import CreateCategoryModal from "../Categories/CreateCategoryModal";
import CreateSubcategoryModal from "../SubCategories/CreateSubcategoryModal";
import CreateInterestFormModal from "../WannaBe/CreateInterestFormModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createWannaBeInterest } from "@/app/api/admin/wannabe";
import { toast } from "react-toastify";

const QuickActions = ({ fetchData }: { fetchData: () => Promise<void> }) => {
	const navigation = useRouter();
	const [wannaBeModal, setWannaBeModal] = useState(false);

	const toggleWannaBeModal = () => {
		setWannaBeModal(!wannaBeModal);
	};
	const handleWannaBeSubmit = async (formData: FormData): Promise<void> => {
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
			<Card className='h-100 shadow-sm'>
				<CardHeader>
					<h5 className='fw-bold mb-0'>Quick Actions</h5>
				</CardHeader>
				<CardBody>
					<Row className='g-3'>
						<Col
							xs={6}
							md={6}
							xl={6}>
							<CreateCategoryModal fetchData={fetchData} />
						</Col>
						<Col
							xs={6}
							md={6}
							xl={6}>
							<CreateSubcategoryModal fetchData={fetchData} />
						</Col>
						<Col
							xs={6}
							md={6}
							xl={6}>
							<Button
								color='primary'
								className='w-100'
								onClick={toggleWannaBeModal}>
								<i className='fa fa-plus me-2 py-1' />
								Add Interests
							</Button>
							<CreateInterestFormModal
								modalOpen={wannaBeModal}
								toggleModal={toggleWannaBeModal}
								handleSubmit={handleWannaBeSubmit}
							/>
						</Col>
						<Col
							xs={6}
							md={6}
							xl={6}>
							<Button
								color='primary'
								className='w-100'
								onClick={() => navigation.push("/admin/create-course")}>
								<i className='fa fa-plus me-2 py-1' /> Add Course
							</Button>
						</Col>
						<Col
							xs={6}
							md={6}
							xl={6}>
							<Button
								color='primary'
								className='w-100'
								onClick={() => navigation.push("/admin/paths/create-path")}>
								<i className='fa fa-plus me-2 py-1' /> Add Path
							</Button>
						</Col>
						<Col
							xs={6}
							md={6}
							xl={6}>
							<Button
								color='primary'
								className='w-100'
								onClick={() => navigation.push("/admin/announcements")}>
								<i className='fa fa-plus me-2 py-1' /> Announcement
							</Button>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default QuickActions;

"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	Button,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import {
	getAllCategories,
	getAllCourses,
	getAllSubcategories,
	getAllWannaBeInterests,
	updateCourse,
} from "@/app/api/cc";
import Image from "next/image";
import { toast } from "react-toastify";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const CoursesContainerCC = () => {
	const [courses, setCourses] = useState<any[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [categories, setCategories] = useState<any[]>([]);
	const [subcategories, setSubcategories] = useState<any[]>([]);
	const [wannabe, setWannaBe] = useState<any[]>([]);
	const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterest: [] as string[],
	});

	const fetchCourses = async () => {
		const response = await getAllCourses();
		setCourses(response.courses);
	};
	const fetchCategories = async () => {
		const response = await getAllCategories();
		setCategories(response.categories);
	};
	const fetchSubcategories = async () => {
		const response = await getAllSubcategories();
		setSubcategories(response.subcategories);
	};
	const fetchWannaBe = async () => {
		const response = await getAllWannaBeInterests();
		setWannaBe(response.interests);
	};

	useEffect(() => {
		fetchCourses();
		fetchCategories();
		fetchSubcategories();
		fetchWannaBe();
	}, []);

	const openUpdateModal = (course: any) => {
		setSelectedCourse(course);
		setFormData({
			name: course.title,
			description: course.description || "",
			categoryId: course.category || "",
			subcategoryId: course.subcategory || "",
			wannaBeInterest: course.interest
				? course.interest.split(",").map((i: string) => i.trim())
				: [],
		});
		setModalOpen(true);
	};

	const handleUpdate = async () => {
		try {
			await updateCourse(selectedCourse.id, {
				...formData,
				wannaBeInterest: formData.wannaBeInterest.filter((id) => id !== "N/A"),
			});
			setModalOpen(false);
			fetchCourses();
			toast.success("Course updated successfully");
		} catch (err) {
			console.error("Update error", err);
			toast.error("Error updating course");
		}
	};

	useEffect(() => {
		setFilteredSubcategories(
			subcategories.filter((sub) => sub.categoryId === formData.categoryId)
		);
	}, [formData]);

	const handleCheckboxChange = (id: string) => {
		setFormData((prev) => {
			const exists = prev.wannaBeInterest.includes(id);
			console.log(formData);

			return {
				...prev,
				wannaBeInterest: exists
					? prev.wannaBeInterest.filter((item) => item !== id)
					: [...prev.wannaBeInterest, id],
			};
		});
	};

	return (
		<div className='p-3'>
			<Row className='g-3'>
				{courses.map((course) => (
					<Col
						md={6}
						lg={4}
						key={course.id}>
						<Card className='h-100'>
							<CardBody>
								{course.photo && (
									<Image
										src={`${backendURL}/${course.photo}`}
										alt={course.title}
										width={300}
										height={160}
										style={{ objectFit: "cover", width: "100%" }}
									/>
								)}
								<h5 className='mt-3 mb-2'>{course.title}</h5>
								<p className='text-muted'>
									₹{course.discountedPrice}{" "}
									<s className='text-danger'>₹{course.realPrice}</s>
								</p>
								<Button
									color='primary'
									size='sm'
									onClick={() => openUpdateModal(course)}>
									Update Course
								</Button>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>

			<Modal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setModalOpen(false)}>
					Update Course
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label>Title</Label>
						<Input
							type='text'
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<Input
							type='textarea'
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Category</Label>
						<Input
							type='select'
							value={formData.categoryId}
							onChange={(e) =>
								setFormData({
									...formData,
									categoryId: e.target.value,
									subcategoryId: "",
								})
							}>
							<option value=''>Select Category</option>
							{categories.map((cat: any) => (
								<option
									key={cat._id}
									value={cat._id}>
									{cat.title}
								</option>
							))}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label>Subcategory</Label>
						<Input
							type='select'
							value={formData.subcategoryId}
							onChange={(e) =>
								setFormData({ ...formData, subcategoryId: e.target.value })
							}>
							<option value=''>Select Subcategory</option>
							{filteredSubcategories.map((sub: any) => (
								<option
									key={sub._id}
									value={sub._id}>
									{sub.title}
								</option>
							))}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label>WannaBe Interests</Label>
						<div className='d-flex flex-wrap gap-2'>
							{wannabe.map((w: any) => (
								<FormGroup
									check
									key={w._id}>
									<Label check>
										<Input
											type='checkbox'
											checked={formData.wannaBeInterest.includes(w._id)}
											onChange={() => handleCheckboxChange(w._id)}
										/>
										{w.title}
									</Label>
								</FormGroup>
							))}
						</div>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button
						color='secondary'
						onClick={() => setModalOpen(false)}>
						Cancel
					</Button>
					<Button
						color='success'
						onClick={handleUpdate}>
						Save Changes
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default CoursesContainerCC;

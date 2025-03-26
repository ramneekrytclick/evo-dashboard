import { Course } from "@/Types/Course.type";
import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";

interface EditCourseModalProps {
	isOpen: boolean;
	toggle: () => void;
	course: Course;
	onSave: (updatedCourse: any) => void;

	// Optionally passed from parent
	categories: { _id: string; name: string }[];
	subcategories: { _id: string; name: string }[];
	interests: { _id: string; name: string }[];
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
	isOpen,
	toggle,
	course,
	onSave,
	categories = [],
	subcategories = [],
	interests = [],
}) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [subcategoryId, setSubcategoryId] = useState("");
	const [wannaBeInterest, setWannaBeInterest] = useState<string>("");

	useEffect(() => {
		if (course) {
			setName(course.name || course.title || "");
			setDescription(course.description || "");
			setCategoryId((course as any).categoryId || "");
			setSubcategoryId(course.subcategory?._id || "");
			setWannaBeInterest(course.wannaBeInterest?.[0]?._id || "");
		}
	}, [course]);

	const handleSave = () => {
		const updated = {
			...course,
			name,
			description,
			categoryId,
			subcategoryId,
			wannaBeInterest, // now a single ID
		};
		onSave(updated);
		toggle();
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Edit Course</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for="name">Course Name</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter course name"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="description">Description</Label>
						<Input
							id="description"
							type="textarea"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter course description"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="categoryId">Category</Label>
						<Input
							id="categoryId"
							type="select"
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}>
							<option value="">Select Category</option>
							{categories.map((cat) => (
								<option
									key={cat._id}
									value={cat._id}>
									{cat.name}
								</option>
							))}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="subcategoryId">Subcategory</Label>
						<Input
							id="subcategoryId"
							type="select"
							value={subcategoryId}
							onChange={(e) => setSubcategoryId(e.target.value)}>
							<option value="">Select Subcategory</option>
							{subcategories.map((sub) => (
								<option
									key={sub._id}
									value={sub._id}>
									{sub.name}
								</option>
							))}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="wannaBeInterest">Wanna Be Interest</Label>
						<Input
							id="wannaBeInterest"
							type="select"
							value={wannaBeInterest}
							onChange={(e) => setWannaBeInterest(e.target.value)}>
							<option value="">Select Interest</option>
							{interests.map((interest) => (
								<option
									key={interest._id}
									value={interest._id}>
									{interest.name}
								</option>
							))}
						</Input>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color="primary"
					onClick={handleSave}>
					Save
				</Button>
				<Button
					color="secondary"
					onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default EditCourseModal;

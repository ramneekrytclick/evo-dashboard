"use client";

import { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Input,
	Label,
	Row,
	Col,
	Button,
} from "reactstrap";
import { getCourses } from "@/app/api/admin/course";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import { getPathById, updatePath } from "@/app/api/admin/path";
import { toast } from "react-toastify";
import Select from "react-select";

const MAX_IMAGE_SIZE_MB = 2;

const UpdatePathModal = ({
	id,
	fetchData,
	modal,
	toggle,
}: {
	id: string;
	fetchData: () => Promise<void>;
	modal: boolean;
	toggle: () => void;
}) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		timing: "",
		price: 0,
		courses: [] as string[],
		wannaBeInterest: [] as string[],
	});
	const [photo, setPhoto] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [courses, setCourses] = useState<any[]>([]);
	const [wannaBeInterests, setWannaBeInterests] = useState<any[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const [courseRes, wannaBeRes, pathRes] = await Promise.all([
					getCourses(),
					getWannaBeInterests(),
					getPathById(id).then((res) => res.path),
				]);

				setCourses(courseRes);
				setWannaBeInterests(wannaBeRes);

				setFormData({
					title: pathRes.title || pathRes.name || "",
					description: pathRes.description || "",
					timing: pathRes.timing || "",
					price: pathRes.price || 0,
					courses: (pathRes.courses || []).map((c: any) => c._id || c.id || c),
					wannaBeInterest: (pathRes.wannaBeInterest || []).map((w: any) => {
						const matched = wannaBeRes.find(
							(i: any) => i.title === (w.title || w)
						);
						return matched?._id || w;
					}),
				});
			} catch (err) {
				console.error(err);
				toast.error("Failed to load resources");
			}
		};

		if (modal) {
			fetchInitialData();
		} else {
			// Reset on close
			setPhoto(null);
			setPhotoPreview(null);
			setIsSubmitting(false);
		}
	}, [modal, id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "price" ? Number(value) : value,
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
			toast.error("Image must be less than 2MB");
			return;
		}

		setPhoto(file);
		setPhotoPreview(URL.createObjectURL(file));
	};

	const validateForm = () => {
		if (!formData.title.trim()) return "Title is required";
		if (!formData.description.trim()) return "Description is required";
		if (!formData.timing.trim()) return "Timing is required";
		if (formData.courses.length === 0) return "At least one course is required";
		if (formData.wannaBeInterest.length === 0)
			return "At least one interest is required";
		return null;
	};

	const handleUpdate = async () => {
		const error = validateForm();
		if (error) {
			toast.error(error);
			return;
		}

		const payload = new FormData();
		payload.append("title", formData.title);
		payload.append("description", formData.description);
		payload.append("timing", formData.timing);
		payload.append("price", formData.price.toString());
		payload.append("courseIds", formData.courses.join(","));
		payload.append("wannaBeInterestIds", formData.wannaBeInterest.join(","));
		if (photo) payload.append("photo", photo);

		setIsSubmitting(true);

		await toast.promise(updatePath(id, payload), {
			pending: "Updating path...",
			success: "Path updated successfully",
			error: "Failed to update path",
		});

		toggle();
		fetchData();
		setIsSubmitting(false);
	};

	const courseOptions = courses.map((c) => ({ label: c.title, value: c._id }));
	const interestOptions = wannaBeInterests.map((i) => ({
		label: i.title,
		value: i._id,
	}));

	return (
		<Modal
			isOpen={modal}
			toggle={toggle}
			size='lg'
			centered>
			<ModalHeader toggle={toggle}>Update Path</ModalHeader>
			<ModalBody>
				<Form onSubmit={(e) => e.preventDefault()}>
					<Row className='g-3'>
						<Col md={6}>
							<Label>Path Title *</Label>
							<Input
								name='title'
								value={formData.title}
								onChange={handleChange}
							/>
						</Col>
						<Col md={6}>
							<Label>Description *</Label>
							<Input
								name='description'
								value={formData.description}
								onChange={handleChange}
							/>
						</Col>
						<Col md={6}>
							<Label>Timing *</Label>
							<Input
								name='timing'
								value={formData.timing}
								onChange={handleChange}
							/>
						</Col>
						<Col md={6}>
							<Label>Photo (max 2MB)</Label>
							<Input
								type='file'
								onChange={handleImageChange}
							/>
							{photoPreview && (
								<img
									src={photoPreview}
									alt='preview'
									style={{
										marginTop: "10px",
										maxWidth: "100%",
										maxHeight: "200px",
									}}
								/>
							)}
						</Col>
						<Col md={6}>
							<Label>Courses *</Label>
							<Select
								isMulti
								name='courses'
								options={courseOptions}
								value={courseOptions.filter((c) =>
									formData.courses.includes(c.value)
								)}
								onChange={(selected) =>
									setFormData((prev) => ({
										...prev,
										courses: selected.map((s) => s.value),
									}))
								}
							/>
						</Col>
						<Col md={6}>
							<Label>WannaBe Interests *</Label>
							<Select
								isMulti
								name='wannaBeInterest'
								options={interestOptions}
								value={interestOptions.filter((i) =>
									formData.wannaBeInterest.includes(i.value)
								)}
								onChange={(selected) =>
									setFormData((prev) => ({
										...prev,
										wannaBeInterest: selected.map((s) => s.value),
									}))
								}
							/>
						</Col>
					</Row>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color='primary'
					onClick={handleUpdate}
					disabled={isSubmitting}>
					{isSubmitting ? "Updating..." : "Update Path"}
				</Button>
				<Button
					color='outline-primary'
					onClick={toggle}
					disabled={isSubmitting}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default UpdatePathModal;

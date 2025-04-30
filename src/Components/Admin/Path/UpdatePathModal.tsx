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
	const [courses, setCourses] = useState<any[]>([]);
	const [wannaBeInterests, setWannaBeInterests] = useState<any[]>([]);

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
		}
	}, [modal, id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "price" ? Number(value) : value,
		}));
	};

	const handleUpdate = async () => {
		if (
			!formData.title ||
			!formData.description ||
			!formData.courses.length ||
			!formData.wannaBeInterest.length
		) {
			toast.error(
				"All fields are required, including at least one course and interest!"
			);
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

		try {
			await updatePath(id, payload);
			toast.success("Path updated successfully");
			toggle();
			fetchData();
		} catch (err) {
			console.error(err);
			toast.error("Failed to update path");
		}
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
							<Label>Photo</Label>
							<Input
								type='file'
								onChange={(e) => setPhoto(e.target.files?.[0] || null)}
							/>
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
									setFormData({
										...formData,
										courses: selected.map((s) => s.value),
									})
								}
								className='basic-multi-select'
								classNamePrefix='select'
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
									setFormData({
										...formData,
										wannaBeInterest: selected.map((s) => s.value),
									})
								}
								className='basic-multi-select'
								classNamePrefix='select'
							/>
						</Col>
					</Row>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button
					color='primary'
					onClick={handleUpdate}>
					Update Path
				</Button>
				<Button
					color='outline-primary'
					onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default UpdatePathModal;

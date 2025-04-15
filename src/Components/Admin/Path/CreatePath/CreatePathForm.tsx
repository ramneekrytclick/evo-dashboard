"use client";
import { getCourses } from "@/app/api/admin/course";
import { createPath } from "@/app/api/admin/path";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import { CourseProps } from "@/Types/Course.type";
import { PathProps } from "@/Types/Path.type";
import { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import {
	Col,
	Form,
	Input,
	Label,
	Row,
	Button,
	ListGroup,
	ListGroupItem,
} from "reactstrap";

const CreatePathForm = () => {
	const [formData, setFormData] = useState<PathProps>({
		title: "",
		description: "",
		timing: "",
		price: 0,
		courses: [],
		wannaBeInterest: [],
	});
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [wannaBeInterests, setWannaBeInterests] = useState<any[]>([]);
	const [photo, setPhoto] = useState<File | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const courseRes = await getCourses();
				const wannaBeRes = await getWannaBeInterests();
				setCourses(courseRes);
				setWannaBeInterests(wannaBeRes);
			} catch (err) {
				toast.error("Failed to load resources");
			}
		})();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "price" ? Number(value) : value,
		});
	};

	const toggleCourse = (id: string) => {
		const exists = formData.courses.includes(id);
		const updated = exists
			? formData.courses.filter((cid) => cid !== id)
			: [...formData.courses, id];
		setFormData({ ...formData, courses: updated });
	};

	const toggleWannaBe = (id: string) => {
		const exists = formData.wannaBeInterest.includes(id);
		const updated = exists
			? formData.wannaBeInterest.filter((wid) => wid !== id)
			: [...formData.wannaBeInterest, id];
		setFormData({ ...formData, wannaBeInterest: updated });
	};

	const handleSubmit = async () => {
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
		Object.entries(formData).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				payload.append(key, value.join(","));
			} else {
				payload.append(key, value.toString());
			}
		});
		if (photo) payload.append("photo", photo);

		try {
			if (photo) {
				await createPath({ ...formData, photo });
			} else {
				await createPath(formData);
			}

			toast.success("Path created successfully");
			setFormData({
				title: "",
				description: "",
				timing: "",
				price: 0,
				courses: [],
				wannaBeInterest: [],
			});
			setPhoto(null);
		} catch (err) {
			toast.error("Failed to create path");
		}
	};

	return (
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
					<ScrollBar style={{ height: "150px" }}>
						<ListGroup>
							{courses?.map((course) => (
								<ListGroupItem key={course._id}>
									<Input
										type='checkbox'
										checked={formData.courses.includes(course._id!)}
										onChange={() => toggleCourse(course._id!)}
									/>
									<span className='ms-2'>{course.title}</span>
								</ListGroupItem>
							))}
						</ListGroup>
					</ScrollBar>
				</Col>
				<Col md={6}>
					<Label>WannaBe Interests *</Label>
					<ScrollBar style={{ height: "150px" }}>
						<ListGroup>
							{wannaBeInterests?.map((item) => (
								<ListGroupItem key={item._id}>
									<Input
										type='checkbox'
										checked={formData.wannaBeInterest.includes(item._id)}
										onChange={() => toggleWannaBe(item._id)}
									/>
									<span className='ms-2'>{item.title}</span>
								</ListGroupItem>
							))}
						</ListGroup>
					</ScrollBar>
				</Col>
				<Col
					xs={12}
					className='text-end mt-3'>
					<Button
						color='primary'
						onClick={handleSubmit}>
						Create Path
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreatePathForm;

"use client";
import { getCourses } from "@/app/api/admin/course";
import { createPath } from "@/app/api/admin/path";
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
	const [selectedCourses, setSelectedCourses] = useState<CourseProps[]>([]);
	const [roadmap, setRoadmap] = useState<string[]>([]);
	const [formData, setFormData] = useState<PathProps>({
		name: "",
		description: "",
		courses: [],
		roadmapSuggestions: [],
	});
	const [suggestion, setSuggestion] = useState("");
	const [courses, setCourses] = useState<CourseProps[]>([]);

	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			setCourses(response.courses);
		} catch (error) {
			toast.error("Error Fetching Courses!");
		}
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const toggleCourseSelection = (course: CourseProps) => {
		const isSelected = selectedCourses.some(
			(selected) => selected._id === course._id
		);

		const updatedCourses = isSelected
			? selectedCourses.filter((selected) => selected._id !== course._id)
			: [...selectedCourses, course];

		setSelectedCourses(updatedCourses);
		setFormData({ ...formData, courses: updatedCourses });
	};

	const addRoadmapEntry = () => {
		if (suggestion.trim()) {
			const newRoadmap = [...roadmap, suggestion];
			setRoadmap(newRoadmap);
			setFormData({ ...formData, roadmapSuggestions: newRoadmap });
			setSuggestion("");
		} else {
			toast.error("Suggestion cannot be empty!");
		}
	};

	const removeRoadmapEntry = (index: number) => {
		const updatedRoadmap = roadmap.filter((_, i) => i !== index);
		setRoadmap(updatedRoadmap);
		setFormData({ ...formData, roadmapSuggestions: updatedRoadmap });
	};

	const handleSubmit = async () => {
		if (!formData.name.trim() || !formData.description.trim()) {
			toast.error("Name and Description are required!");
			return;
		}
		if (selectedCourses.length === 0) {
			toast.error("Select at least one course!");
			return;
		}
		console.log(formData);
		try {
			const response = await createPath(formData);
			console.log(response);
			toast.success("Path Created Successfully!");
		} catch (error) {
			toast.error("Error in Creating Path");
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	return (
		<Form
			onSubmit={(e) => e.preventDefault()}
			className="needs-validation"
			noValidate>
			<Row className="g-3">
				<Col sm={6}>
					<Label>
						{"Path Name"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Path Name"
						name="name"
						value={formData.name}
						onChange={handleFormChange}
					/>
				</Col>
				<Col sm={6}>
					<Label>
						{"Description"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Description"
						name="description"
						value={formData.description}
						onChange={handleFormChange}
					/>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<Label>{"Courses"}</Label>
					<ScrollBar
						className="scroll-demo scroll-b-none border-primary"
						style={{ width: "100%", height: "22.5em" }}>
						<ListGroup>
							{courses?.map((course) => (
								<ListGroupItem
									key={course._id}
									className="my-1 rounded-3 bg-light text-dark border-b-dark">
									<Input
										type="checkbox"
										value={course._id}
										checked={selectedCourses.some(
											(selected) => selected._id === course._id
										)}
										onChange={() => toggleCourseSelection(course)}
									/>
									<span className="ms-2">{course.title}</span>
								</ListGroupItem>
							))}
						</ListGroup>
					</ScrollBar>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<Label>{"Roadmap Suggestions"}</Label>
					<Input
						type="text"
						placeholder="Add a suggestion"
						value={suggestion}
						onChange={(e) => setSuggestion(e.target.value)}
					/>
					<Button
						color="primary"
						className="mt-2"
						onClick={addRoadmapEntry}>
						Add Suggestion
					</Button>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<ul>
						{roadmap.map((entry, index) => (
							<li
								key={index}
								className="my-2 p-2 bg-light text-dark rounded-3">
								<Row>
									<Col sm={11}>{entry}</Col>
									<Col sm={1}>
										<Button
											color="danger"
											size="sm"
											onClick={() => removeRoadmapEntry(index)}>
											Remove
										</Button>
									</Col>
								</Row>
							</li>
						))}
					</ul>
				</Col>
			</Row>
			<Col
				xs={12}
				className="text-end">
				<Button
					color="primary"
					onClick={handleSubmit}>
					Create New Path
				</Button>
			</Col>
		</Form>
	);
};

export default CreatePathForm;

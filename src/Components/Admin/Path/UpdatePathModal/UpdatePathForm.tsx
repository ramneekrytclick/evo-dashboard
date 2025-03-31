import { FormEvent, useEffect, useState } from "react";
import {
	Button,
	Col,
	Form,
	Input,
	Label,
	Row,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import { PathProps } from "@/Types/Path.type";
import { updatePath } from "@/app/api/admin/path";
import { getCourses } from "@/app/api/admin/course";
import { CourseProps } from "@/Types/Course.type";
import { toast } from "react-toastify";
import ScrollBar from "react-perfect-scrollbar";

interface UpdatePathFormProps {
	toggle: () => void;
	values: PathProps;
}

const UpdatePathForm = ({ toggle, values }: UpdatePathFormProps) => {
	const [formData, setFormData] = useState<PathProps>({ ...values });
	const [courses, setCourses] = useState<CourseProps[]>([]);
	const [roadmapSuggestion, setRoadmapSuggestion] = useState("");

	const fetchCourses = async () => {
		try {
			const response = await getCourses();
			setCourses(response);
		} catch (error) {
			toast.error("Error fetching courses!");
		}
	};

	useEffect(() => {
		// Load initial courses from the API
		fetchCourses();
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await updatePath(values._id!, formData);
			toast.success("Path updated successfully!");
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Error updating path!");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const toggleCourseSelection = (course: CourseProps) => {
		const isSelected = formData.courses.some(
			(selected) => selected._id === course._id
		);
		const updatedCourses = isSelected
			? formData.courses.filter((selected) => selected._id !== course._id)
			: [...formData.courses, course];
		setFormData({ ...formData, courses: updatedCourses });
	};

	const addRoadmapSuggestion = () => {
		if (roadmapSuggestion.trim()) {
			const updatedSuggestions = formData.roadmapSuggestions
				? [...formData.roadmapSuggestions, roadmapSuggestion]
				: [roadmapSuggestion];
			setFormData({ ...formData, roadmapSuggestions: updatedSuggestions });
			setRoadmapSuggestion("");
		} else {
			toast.error("Suggestion cannot be empty!");
		}
	};

	const removeRoadmapSuggestion = (index: number) => {
		const updatedSuggestions = formData.roadmapSuggestions!.filter(
			(_, i) => i !== index
		);
		setFormData({ ...formData, roadmapSuggestions: updatedSuggestions });
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter path name"
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						name="description"
						type="text"
						value={formData.description}
						onChange={handleChange}
						placeholder="Enter path description"
					/>
				</Col>
				<Col md={12}>
					<Label>Courses</Label>
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
										checked={formData.courses.some(
											(selected) => selected._id === course._id
										)}
										onChange={() => toggleCourseSelection(course)}
									/>
									<span className="ms-2">{course.name}</span>
								</ListGroupItem>
							))}
						</ListGroup>
					</ScrollBar>
				</Col>
				<Col md={12}>
					<Label>Roadmap Suggestions</Label>
					<Input
						type="text"
						placeholder="Add a suggestion"
						value={roadmapSuggestion}
						onChange={(e) => setRoadmapSuggestion(e.target.value)}
					/>
					<Button
						color="primary"
						className="mt-2"
						onClick={addRoadmapSuggestion}>
						Add Suggestion
					</Button>
					<ul className="mt-3">
						{formData.roadmapSuggestions?.map((suggestion, index) => (
							<li
								key={index}
								className="p-2 bg-light text-dark rounded-3 w-75">
								<Row className="text-start">
									<Col sm={8}>{suggestion}</Col>
									<Col sm={4}>
										<Button
											color="danger"
											size="xs"
											onClick={() => removeRoadmapSuggestion(index)}>
											Remove
										</Button>
									</Col>
								</Row>
							</li>
						))}
					</ul>
				</Col>
				<Col md={12}>
					<Button
						color="primary"
						type="submit">
						Update Path
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default UpdatePathForm;

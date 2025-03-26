import { Continue, CourseTitle, Description } from "@/Constant";
import { CourseProps } from "@/Types/Course.type";
import { LessonFormProps } from "@/Types/Lesson.type";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface DetailsFormProps {
	activeCallBack: (tab: number) => void;
	courses: CourseProps[];
	data: LessonFormProps;
	setData: (data: LessonFormProps) => void;
}
const DetailsForm = ({
	activeCallBack,
	courses,
	data,
	setData,
}: DetailsFormProps) => {
	const [formData, setFormData] = useState({
		courseId: "",
		title: "",
		description: "",
	});
	const { courseId, title, description } = formData;
	const updateFormData = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleNextButton = () => {
		if (courseId !== "" && title !== "" && description !== "") {
			activeCallBack(2);
		} else {
			toast("Fill in all fields");
		}
	};
	useEffect(() => {
		setData({
			...data,
			courseId: formData.courseId,
			title: formData.title,
		});
	}, [formData]);
	return (
		<Form
			onSubmit={(e) => e.preventDefault()}
			className="needs-validation"
			noValidate>
			<Row className="g-3">
				<Col sm={6}>
					<Label>
						{"Lesson Title"}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Lesson Title"
						value={title}
						name="title"
						onChange={updateFormData}
					/>
				</Col>
				<Col sm={6}>
					<Label>
						{Description}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="text"
						placeholder="Enter last name"
						value={description}
						name="description"
						onChange={updateFormData}
					/>
				</Col>
				<Col
					xl={5}
					sm={4}>
					<Label>
						{CourseTitle}
						<span className="txt-danger">*</span>
					</Label>
					<Input
						type="select"
						value={courseId}
						name="courseId"
						onChange={updateFormData}>
						<option value={""}>{"Choose Course"}</option>
						{courses?.map((course, index) => {
							return (
								<option
									key={index}
									value={course._id}>
									{course.name}
								</option>
							);
						})}
					</Input>
				</Col>
				<Col
					xs={12}
					className="text-end">
					<Button
						color="primary"
						onClick={handleNextButton}>
						{Continue}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default DetailsForm;

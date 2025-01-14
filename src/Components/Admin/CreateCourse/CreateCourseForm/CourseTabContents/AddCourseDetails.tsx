import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Row, Form, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import { AddDescription, CourseDuration, CourseTitleLabel } from "@/Constant";
import SVG from "@/CommonComponent/SVG";
import { CourseFormProps } from "@/Types/Course.type";

interface AddCourseDetailsProps {
	activeCallBack: (tab: number) => void;
	data: CourseFormProps;
	setData: (data: CourseFormProps) => void;
}

const AddCourseDetails: React.FC<AddCourseDetailsProps> = ({
	activeCallBack,
	data,
	setData,
}) => {
	const [formData, setFormData] = useState({
		courseTitle: "",
		description: "",
		duration: "",
	});
	const { courseTitle, description, duration } = formData;
	const updateFormData = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleNextButton = () => {
		if (courseTitle !== "" && description !== "" && duration !== "") {
			activeCallBack(2);
		} else {
			return toast.error(
				"Please fill out details before moving on to the next step"
			);
		}
	};
	useEffect(() => {
		setData({
			...data,
			name: courseTitle,
			description: description,
			duration: duration,
		});
	}, [formData]);
	return (
		<div className="sidebar-body">
			<Form>
				<Row>
					<Row
						xs={12}
						className="mx-0 my-2">
						<Label className="ms-0">
							{CourseTitleLabel} <span className="txt-danger">{"*"}</span>
						</Label>
						<Input
							type="text"
							name="courseTitle"
							value={courseTitle}
							onChange={updateFormData}
						/>
					</Row>
					<Row
						xs={12}
						className="mx-0 my-2">
						<Label className="ms-0">
							{AddDescription} <span className="txt-danger">{"*"}</span>
						</Label>
						<Input
							type="text"
							name="description"
							value={description}
							onChange={updateFormData}
						/>
					</Row>
					<Row
						xs={12}
						className="mx-0 my-2">
						<Label className="ms-0">
							{CourseDuration} <span className="txt-danger">{"*"}</span>
						</Label>
						<Input
							type="text"
							name="duration"
							value={duration}
							onChange={updateFormData}
						/>
					</Row>
				</Row>
			</Form>
			<div className="product-buttons">
				<Button
					color="transparent"
					onClick={handleNextButton}>
					<div className="d-flex align-items-center gap-sm-2 gap-1">
						{"Next"} <SVG iconId="front-arrow" />
					</div>
				</Button>
			</div>
		</div>
	);
};
export default AddCourseDetails;

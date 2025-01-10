import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import { AddCategory, AddSubCategory, CourseTitleLabel } from "@/Constant";
import SVG from "@/CommonComponent/SVG";
import {
	addCategoryItem,
	courseSubCategoryItem,
} from "@/Data/Admin/Courses/Course";
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
		category: "",
		subcategory: "",
	});
	const { courseTitle, category, subcategory } = formData;
	const updateFormData = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleNextButton = () => {
		if (courseTitle !== "") {
			activeCallBack(2);
		} else {
			return toast.error(
				"Please fill out details before moving on to the next step"
			);
		}
	};
	useEffect(()=>{
		setData({...data,courseName:formData.courseTitle,category:formData.category,subcategory:formData.category});
	},[formData])
	return (
		<div className="sidebar-body">
			<Form>
				<Row className="g-2">
					<Col
						xs={12}
						className="m-0">
						<Label>
							{CourseTitleLabel} <span className="txt-danger">{"*"}</span>
						</Label>
						<Input
							type="text"
							name="courseTitle"
							value={courseTitle}
							onChange={updateFormData}
						/>
					</Col>

					<Col xs={12}>
						<Label className="m-0">{AddCategory}</Label>
					</Col>
					<Col xs={12}>
						<Input
							type="select"
							name="category"
							value={category}
							onChange={updateFormData}>
							{addCategoryItem.map((item, index) => (
								<option key={index}>{item}</option>
							))}
						</Input>
					</Col>
					<Col xs={12}>
						<Label className="m-0">{AddSubCategory}</Label>
					</Col>
					<Col xs={12}>
						<Input
							type="select"
							name="subcategory"
							value={subcategory}
							onChange={updateFormData}>
							{courseSubCategoryItem.map((item, index) => (
								<option key={index}>{item}</option>
							))}
						</Input>
					</Col>
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

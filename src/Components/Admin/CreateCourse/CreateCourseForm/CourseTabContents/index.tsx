import React, { FormEvent, useEffect, useState } from "react";
import { Col, Form, TabContent, TabPane } from "reactstrap";
import { CourseFormProps, CourseTabContentProp } from "@/Types/Course.type";

import AddCourseDetails from "./AddCourseDetails";
import SellingPrice from "./SellingPrice";
import AdvanceSection from "./AdvanceSection";
import { createCourse } from "@/app/api/admin/course";
import CourseCategories from "./CourseCategories";

const CourseTabContents: React.FC<CourseTabContentProp> = ({
	steps,
	activeCallBack,
}) => {
	const [data, setData] = useState<CourseFormProps>({
		name: "",
		category: { _id: "", name: "" },
		subcategory: { _id: "", categoryId: "", name: "" },
		description: "",
		duration: "",
		mentorAssigned: "",
		managerAssigned: "",
		realPrice: "",
		promoCodes: [""],
	});
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await createCourse(data);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(()=>{
		console.log(data);
	},[data])
	return (
		<Col
			xxl={9}
			xl={8}
			className="box-col-8 position-relative">
			<Form onSubmit={handleSubmit}>
				<TabContent activeTab={steps}>
					<TabPane tabId={1}>
						<AddCourseDetails
							activeCallBack={activeCallBack}
							data={data}
							setData={setData}
						/>
					</TabPane>
					<TabPane tabId={2}>
						<CourseCategories
							activeCallBack={activeCallBack}
							data={data}
							setData={setData}
						/>
					</TabPane>
					<TabPane tabId={3}>
						<AdvanceSection
							activeCallBack={activeCallBack}
							data={data}
							setData={setData}
						/>
					</TabPane>
					<TabPane tabId={4}>
						<SellingPrice
							activeCallBack={activeCallBack}
							data={data}
							setData={setData}
							submitFunction={handleSubmit}
						/>
					</TabPane>
				</TabContent>
			</Form>
		</Col>
	);
};
export default CourseTabContents;

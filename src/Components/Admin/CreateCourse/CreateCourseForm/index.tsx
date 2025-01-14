"use client";

import { useCallback, useState } from "react";
import CourseFormNav from "./CourseFormNav";
import CourseTabContents from "./CourseTabContents";

const CreateCourseForm = () => {
	const [steps, setSteps] = useState(1);
	const activeCallBack = useCallback((tab: number) => {
		setSteps(tab);
	}, []);

	return (
		<>
			<CourseFormNav
				steps={steps}
				setSteps={setSteps}
			/>
			<CourseTabContents
				steps={steps}
				activeCallBack={activeCallBack}
			/>
		</>
	);
};

export default CreateCourseForm;

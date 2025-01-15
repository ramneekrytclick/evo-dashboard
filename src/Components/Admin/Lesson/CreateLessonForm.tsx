'use client'
import { Row } from "reactstrap";
import LessonFormNavComponent from "./LessonFormNavComponent";
import { useState } from "react";
import LessonFormTabContent from "./LessonFormTabContent";

const CreateLessonForm = () => {
    const [steps,setSteps]=useState(1);
    const activeCallBack= (tab:number)=>{
        setSteps(tab);
    }
	return (
		<div className={`horizontal-wizard-wrapper`}>
			<Row className="g-3">
				<div className={`main-horizontal-header`}>
					<LessonFormNavComponent
						activeCallBack={activeCallBack}
						steps={steps}
					/>
				</div>
				<div className={'col-12'}>
					<LessonFormTabContent
						activeCallBack={activeCallBack}
						steps={steps}
					/>
				</div>
			</Row>
		</div>
	);
};

export default CreateLessonForm;

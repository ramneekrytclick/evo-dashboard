"use client";

import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { CourseProps } from "@/Types/Course.type";
import { Edit } from "react-feather";
import CommonModal from "@/CommonComponent/CommonModal";
import { updateCourseTitle } from "@/Constant";
import EditCourseForm from "./UpdateCourseForm";
import { useRouter } from "next/navigation";

const CourseModal = ({
	values,
	fetchData,
}: {
	values: CourseProps;
	fetchData: () => void;
}) => {
	const [modal, setModal] = useState(false);
	const router = useRouter();
	const toggle = () => {
		setModal(!modal);
	};
	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		bodyClass: "dark-sign-up social-profile text-start",
	};
	const goToLessons = () => {
		router.push(`/admin/lessons/${values._id}`);
	};
	const goToBatches = () => {
		router.push(`/admin/batches/${values._id}`);
	};

	return (
		<>
			<ButtonGroup>
				<Button
					color="primary"
					onClick={goToLessons}>
					View Lessons
				</Button>
				<Button
					color="dark"
					onClick={toggle}>
					<Edit size={20} />
				</Button>
				<Button
					color="success"
					onClick={goToBatches}>
					View Batches
				</Button>
			</ButtonGroup>
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{updateCourseTitle}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<EditCourseForm
						toggle={toggle}
						id={values._id || ""}
						wannaBeInterestId={values.wannaBeInterest}
						fetchData={fetchData}
					/>
				</div>
			</CommonModal>
		</>
	);
};
export default CourseModal;

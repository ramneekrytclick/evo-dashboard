"use client";

import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { CourseProps } from "@/Types/Course.type";
import { Edit2 } from "react-feather";
import CommonModal from "@/CommonComponent/CommonModal";
import EditCourseForm from "./UpdateCourseForm";
import { useRouter } from "next/navigation";

const CourseModal = ({
	values,
	fetchData,
	iconOnly = false,
}: {
	values: CourseProps;
	fetchData: () => void;
	iconOnly?: boolean;
}) => {
	const [modal, setModal] = useState(false);
	const router = useRouter();
	const toggle = () => setModal(!modal);

	const goToBatches = () => {
		router.push(`/admin/batches/${values._id}`);
	};

	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		bodyClass: "dark-sign-up social-profile text-start",
	};

	if (iconOnly) {
		return (
			<>
				<Button
					color="link"
					className="p-0"
					onClick={toggle}
					title="Edit WannaBe">
					<Edit2
						size={18}
						className="text-dark"
					/>
				</Button>
				<CommonModal modalData={ModalData}>
					<div className="modal-toggle-wrapper">
						<h5 className="mb-3">Assign WannaBe Interest</h5>
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
	}

	return (
		<>
			<ButtonGroup>
				<Button
					color="dark"
					onClick={toggle}>
					<Edit2
						size={16}
						className="me-1"
					/>
					Assign WannaBe
				</Button>
				<Button
					color="success"
					onClick={goToBatches}>
					View Batches
				</Button>
			</ButtonGroup>
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h5 className="mb-3">Assign WannaBe Interest</h5>
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

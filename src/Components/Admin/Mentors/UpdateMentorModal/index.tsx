"use client"
import { updateAnnoucementTitle, updateMentorTitle } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal";
import { MentorDataProps } from "@/Types/Mentor.type";
import UpdateMentorForm from "./UpdateMentorForm";

const UpdateMentorModal = ({values,fetchData}:{values:MentorDataProps,fetchData:()=>Promise<void>}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		bodyClass: "dark-sign-up social-profile text-start",
	};

	return (
		<>
			<Button
				color="success"
				className="me-2 px-2"
				onClick={toggle}>
				{/* <i className="fa fa-plus me-2" /> */}
				<i className="icon-pencil-alt" />
			</Button>
			{/* <i className="icon-pencil-alt" onClick={toggle}/> */}
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{updateMentorTitle}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<UpdateMentorForm toggle={toggle} values={values}/>
				</div>
			</CommonModal>
		</>
	);
};
export default UpdateMentorModal;
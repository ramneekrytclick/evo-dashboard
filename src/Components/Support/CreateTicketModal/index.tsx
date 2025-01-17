"use client"
import CommonModal from "@/CommonComponent/CommonModal";
import { createTicketTitle, CrocsLogin } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";
import CreateTicketForm from "./CreateTicketForm";



const CreateTicketModal = ({fetchData}:{fetchData:()=>void}) => {
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
				color="primary"
				onClick={toggle}>
				<i className="fa fa-plus me-2" />
				{createTicketTitle}
			</Button>
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{createTicketTitle}</h3>
					<CreateTicketForm toggle={toggle} fetchData={fetchData}/>
				</div>
			</CommonModal>
		</>
	);
};
export default CreateTicketModal;

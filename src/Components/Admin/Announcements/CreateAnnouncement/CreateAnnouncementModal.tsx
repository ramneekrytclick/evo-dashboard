"use client";
import { createAnnouncementTitle, EvoLogin } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";

import CreateAnnouncementForm from "./CreateAnnouncementForm";
import CommonModal from "@/CommonComponent/CommonModal";
interface Props {
	fetchData: () => Promise<void>;
}
const CreateAnnouncementModal = ({ fetchData }: Props) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
		fetchData(); // Call the fetchData function to update the list of announcements after creating a new one.
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
				{createAnnouncementTitle}
			</Button>
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{createAnnouncementTitle}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<CreateAnnouncementForm toggle={toggle} />
				</div>
			</CommonModal>
		</>
	);
};
export default CreateAnnouncementModal;

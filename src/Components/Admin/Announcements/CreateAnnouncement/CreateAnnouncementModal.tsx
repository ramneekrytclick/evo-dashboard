"use client";
import { useState } from "react";
import { Button } from "reactstrap";
import CreateAnnouncementForm from "./CreateAnnouncementForm";
import CommonModal from "@/CommonComponent/CommonModal";
import { createAnnouncementTitle } from "@/Constant";

const CreateAnnouncementModal = ({ fetchData }: { fetchData: () => void }) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
		fetchData();
	};

	return (
		<>
			<Button
				color="primary"
				onClick={() => setModal(true)}>
				<i className="fa fa-plus me-2" />
				{createAnnouncementTitle}
			</Button>
			<CommonModal modalData={{ isOpen: modal, toggler: toggle }}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{createAnnouncementTitle}</h3>
					<CreateAnnouncementForm toggle={() => setModal(false)} />
				</div>
			</CommonModal>
		</>
	);
};

export default CreateAnnouncementModal;

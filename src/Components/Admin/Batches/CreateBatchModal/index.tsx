"use client";
import { createBatchTitle } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal";
import CreateBatchForm from "./CreateBatchForm";

const CreateBatchModal = ({
	fetchData,
}: {
	fetchData: () => Promise<void>;
}) => {
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
				color='success'
				className='btn btn-primary'
				onClick={toggle}>
				{/* <i className="fa fa-plus me-2" /> */}
				<i className='fa fa-plus me-2 py-1' /> Add Batch
			</Button>
			{/* <i className="icon-pencil-alt" onClick={toggle}/> */}
			<CommonModal modalData={ModalData}>
				<div className='modal-toggle-wrapper'>
					<h3 className='mb-3'>{createBatchTitle}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<CreateBatchForm
						fetchData={fetchData}
						toggle={toggle}
					/>
				</div>
			</CommonModal>
		</>
	);
};
export default CreateBatchModal;

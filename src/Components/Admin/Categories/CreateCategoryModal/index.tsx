"use client";
import { createCategoryTitle } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal";
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryModal = ({
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
				color='primary'
				className='w-100 h-100  px-2 p-3'
				onClick={toggle}>
				{/* <i className="fa fa-plus me-2" /> */}
				<i className='fa fa-plus me-2 px-2 ' /> Add Category
			</Button>
			{/* <i className="icon-pencil-alt" onClick={toggle}/> */}
			<CommonModal modalData={ModalData}>
				<div className='modal-toggle-wrapper'>
					<h3 className='mb-3'>{"Add Category"}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<CreateCategoryForm
						fetchData={fetchData}
						toggle={toggle}
					/>
				</div>
			</CommonModal>
		</>
	);
};
export default CreateCategoryModal;

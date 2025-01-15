"use client"
import { updateAnnoucementTitle } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";


import CommonModal from "@/CommonComponent/CommonModal";
import { PromoCodeProps } from "@/Types/Course.type";
import UpdatePromocodeForm from "./UpdatePromocodeForm";


const UpdatePromocodeModal = ({values,fetchData}:{values:PromoCodeProps,fetchData:()=>Promise<void>}) => {
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
					<h3 className="mb-3">{updateAnnoucementTitle}</h3>
					<UpdatePromocodeForm toggle={toggle} values={values} fetchData={fetchData}/>
				</div>
			</CommonModal>
		</>
	);
};
export default UpdatePromocodeModal;
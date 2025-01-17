"use client"
import { updatePathTitle } from "@/Constant";
import React, { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal"
import { PathProps } from "@/Types/Path.type";
import UpdatePathForm from "./UpdatePathForm";


const UpdatePathModal = ({values,fetchData}:{values:PathProps,fetchData:()=>Promise<void>}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const ModalData = {
		isOpen: modal,
		toggler: toggle,
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
					<h3 className="mb-3">{updatePathTitle}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<UpdatePathForm toggle={toggle} values={values}/>
				</div>
			</CommonModal>
		</>
	);
};
export default UpdatePathModal;
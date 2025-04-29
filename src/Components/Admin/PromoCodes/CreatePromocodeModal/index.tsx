"use client";

import { createPromoCodeTitle } from "@/Constant";
import { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal";
import CreatePromocodeForm from "./CreatePromocodeForm";

interface CreatePromocodeModalProps {
	fetchData: () => Promise<void>;
}

const CreatePromocodeModal = ({ fetchData }: CreatePromocodeModalProps) => {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		bodyClass: "dark-sign-up social-profile text-start",
	};

	return (
		<>
			<Button
				color='primary'
				className='w-100'
				onClick={toggle}>
				<i className='fa fa-plus me-2 py-1' />
				Add Promocode
			</Button>
			<CommonModal modalData={ModalData}>
				<div className='modal-toggle-wrapper'>
					<h3 className='mb-3'>{createPromoCodeTitle}</h3>
					<CreatePromocodeForm
						fetchData={fetchData}
						toggle={toggle}
					/>
				</div>
			</CommonModal>
		</>
	);
};

export default CreatePromocodeModal;

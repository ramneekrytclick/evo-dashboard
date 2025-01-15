"use client";

import { deletePromoCode } from "@/app/api/admin/promo-codes";
import React, { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal";
import Image from "next/image";
import { toast } from "react-toastify";
import { deletePromoCodeConfirmTitle, ImagePath } from "@/Constant";

const DeletePromoCodeModal = ({
	id,
	fetchData,
}: {
	id: string;
	fetchData: () => Promise<void>;
}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		center: true,
		bodyClass: "dark-sign-up social-profile text-start",
	};

	const handleDelete = async () => {
		try {
			const response = await deletePromoCode(id);
			toast.success("Promocode deleted!");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			alert("Error deleting promo code.");
		}
	};

	return (
		<>
			<Button
				color="danger"
				className="me-2 px-2"
				onClick={toggle}>
				<i className="icon-trash" />
			</Button>
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper text-center">
					<h3 className="mb-3">
                        {deletePromoCodeConfirmTitle}
					</h3>
					<Image
						width={100}
						height={100}
						src={`${ImagePath}/gif/danger.gif`}
						alt="error"
					/>

					<div className="block text-center mt-4">
						<Button
							outline
							color="danger"
                            className="me-2"
							onClick={toggle}>
							Close
						</Button>
						<Button
							color="danger"
                            className="ms-2"
							onClick={handleDelete}>
							Confirm
						</Button>
					</div>
				</div>
			</CommonModal>
		</>
	);
};

export default DeletePromoCodeModal;

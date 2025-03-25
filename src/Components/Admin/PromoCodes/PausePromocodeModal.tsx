"use client";

import { updatePromoCode } from "@/app/api/admin/promo-codes";
import React, { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal";
import Image from "next/image";
import { toast } from "react-toastify";
import { ImagePath } from "@/Constant";

const PausePromocodeModal = ({
	id,
	isActive,
	fetchData,
}: {
	id: string;
	isActive: boolean;
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

	const handleToggleStatus = async () => {
		try {
			await updatePromoCode(id, !isActive);
			toast.success(
				`Promo code ${!isActive ? "activated" : "paused"} successfully!`
			);
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Error updating promo code status.");
		}
	};

	return (
		<>
			<Button
				color={isActive ? "warning" : "success"}
				className="me-2 px-2"
				onClick={toggle}>
				<i className={isActive ? "icon-minus" : "icon-plus"} />
			</Button>

			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper text-center">
					<h3 className="mb-3">
						{isActive ? "Pause this Promo Code?" : "Activate this Promo Code?"}
					</h3>
					<Image
						width={100}
						height={100}
						src={`${ImagePath}/gif/${isActive ? "danger" : "successful"}.gif`}
						alt={isActive ? "pause" : "activate"}
					/>

					<div className="block text-center mt-4">
						<Button
							outline
							color="secondary"
							onClick={toggle}>
							Close
						</Button>
						<Button
							color={isActive ? "warning" : "success"}
							className="ms-2"
							onClick={handleToggleStatus}>
							Confirm
						</Button>
					</div>
				</div>
			</CommonModal>
		</>
	);
};

export default PausePromocodeModal;

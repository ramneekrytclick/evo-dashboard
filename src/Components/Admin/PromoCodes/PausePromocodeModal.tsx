"use client";
import { useState } from "react";
import { Button } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModal";
import { updatePromoStatus } from "@/app/api/admin/promo-codes";
import { toast } from "react-toastify";

interface PausePromoModalProps {
	id: string;
	isActive: boolean;
	fetchData: () => Promise<void>;
}

const PausePromoModal = ({ id, isActive, fetchData }: PausePromoModalProps) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const handleToggle = async () => {
		try {
			await updatePromoStatus(id, !isActive);
			toast.success(
				`Promo code ${!isActive ? "activated" : "paused"} successfully`
			);
			toggle();
			fetchData();
		} catch (err) {
			toast.error("Failed to update status");
		}
	};

	return (
		<>
			<Button
				color={isActive ? "warning" : "success"}
				onClick={toggle}>
				<i className={isActive ? "icon-minus" : "icon-plus"}></i>
			</Button>
			<CommonModal
				modalData={{
					isOpen: modal,
					toggler: toggle,
					center: true,
					bodyClass: "dark-sign-up",
				}}>
				<div className="text-center">
					<h5>{isActive ? "Pause Promo Code?" : "Activate Promo Code?"}</h5>
					<Button
						outline
						onClick={toggle}>
						Cancel
					</Button>
					<Button
						color={isActive ? "warning" : "success"}
						className="ms-2"
						onClick={handleToggle}>
						Confirm
					</Button>
				</div>
			</CommonModal>
		</>
	);
};

export default PausePromoModal;

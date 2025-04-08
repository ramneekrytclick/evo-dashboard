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
	const [loading, setLoading] = useState(false);

	const handleToggle = async () => {
		try {
			setLoading(true);
			await updatePromoStatus(id, !isActive);
			toast.success(
				`Promo code ${!isActive ? "activated" : "paused"} successfully`
			);
			toggle();
			await fetchData();
		} catch (err) {
			toast.error("Failed to update status");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button
				color={isActive ? "warning" : "success"}
				onClick={toggle}
				size="sm">
				<i className={`me-1 ${isActive ? "icon-pause" : "icon-play"}`} />
				{isActive ? "Pause" : "Activate"}
			</Button>

			<CommonModal
				modalData={{
					isOpen: modal,
					toggler: toggle,
					center: true,
					bodyClass: "dark-sign-up",
				}}>
				<div className="text-center py-3 px-2">
					<h5 className="fw-bold mb-3">
						{isActive ? "Pause this Promo Code?" : "Activate this Promo Code?"}
					</h5>
					<p className="text-muted mb-4">
						Are you sure you want to {isActive ? "pause" : "activate"} this
						promo?
					</p>
					<div className="d-flex justify-content-center gap-3">
						<Button
							outline
							color="secondary"
							onClick={toggle}
							disabled={loading}>
							Cancel
						</Button>
						<Button
							color={isActive ? "warning" : "success"}
							onClick={handleToggle}
							disabled={loading}>
							{loading ? "Processing..." : "Confirm"}
						</Button>
					</div>
				</div>
			</CommonModal>
		</>
	);
};

export default PausePromoModal;

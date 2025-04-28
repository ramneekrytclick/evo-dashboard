"use client";
import { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	Col,
	Row,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import { getPromoCodes, deletePromocode } from "@/app/api/admin/promo-codes";
import { PromoCodeProps } from "@/Types/Course.type";
import CreatePromocodeModal from "./CreatePromocodeModal";
import PausePromoModal from "./PausePromocodeModal";
import { toast } from "react-toastify";
import { Trash } from "react-feather";

const PromocodesCards = () => {
	const [promocodes, setPromocodes] = useState<PromoCodeProps[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedPromoId, setSelectedPromoId] = useState<string | null>(null);

	const fetchPromoCodes = async () => {
		try {
			const response = await getPromoCodes();
			setPromocodes(response.promoCodes);
		} catch (err) {
			console.error("Failed to fetch promo codes", err);
		}
	};

	const handleDelete = async () => {
		if (!selectedPromoId) return;
		try {
			await deletePromocode(selectedPromoId);
			toast.success("Promo code deleted successfully");
			setDeleteModalOpen(false);
			setSelectedPromoId(null);
			await fetchPromoCodes();
		} catch (err) {
			toast.error("Failed to delete promo code");
		}
	};

	useEffect(() => {
		fetchPromoCodes();
	}, []);

	const formatDate = (date: string | null | undefined) => {
		if (!date) return "—";
		return new Date(date).toLocaleDateString();
	};

	const isCourseSpecific = (promo: PromoCodeProps) => !!promo.course;

	return (
		<Col>
			<Row className='ms-1 mb-4'>
				<CreatePromocodeModal fetchData={fetchPromoCodes} />
			</Row>
			<Row style={{ height: "75vh", overflowY: "scroll" }}>
				{promocodes.map((promoCode) => (
					<Col
						sm={6}
						xl={4}
						className='my-2'
						key={promoCode._id}>
						<Card className='height-equal h-100 ribbon-wrapper-bottom text-dark'>
							<div className='ribbon ribbon-dark ribbon-clip-bottom'>
								{promoCode.discountPercentage}% OFF
							</div>
							<CardBody>
								<p className='mb-1'>
									<strong>Promo Code:</strong> {promoCode.code}
								</p>

								{isCourseSpecific(promoCode) ? (
									<>
										<p className='mb-1'>
											<strong>Applicable On:</strong>{" "}
											<span>
												Course – <strong>{promoCode.course?.title}</strong>
											</span>
										</p>
										<p className='mb-1'>
											<strong>Valid Until:</strong>{" "}
											<em className='txt-danger'>
												{formatDate(promoCode.validUntil)}
											</em>
										</p>
									</>
								) : (
									<>
										<p className='mb-1'>
											<strong>Applicable On:</strong>{" "}
											<span className='text-warning'>Overall</span>
										</p>
										<p className='mb-1'>
											<strong>Usage Limit:</strong>{" "}
											{promoCode.usageLimit ?? "∞"}
										</p>
										<p className='mb-1'>
											<strong>Used:</strong> {promoCode.usageCount}
										</p>
									</>
								)}

								<p className='mb-1'>
									<strong>Status:</strong>{" "}
									{promoCode.isActive ? (
										<span className='text-success'>Active</span>
									) : (
										<span className='text-danger'>Inactive</span>
									)}
								</p>
							</CardBody>

							<div className='d-flex justify-content-end mt-3 gap-2 px-3 pb-3'>
								{promoCode._id && (
									<>
										<PausePromoModal
											isActive={promoCode.isActive}
											id={promoCode._id}
											fetchData={fetchPromoCodes}
										/>
										<Button
											color='danger'
											size='sm'
											className=' p-2 d-flex  align-items-center justify-content-center'
											style={{ width: "35px", height: "35px" }}
											onClick={() => {
												setSelectedPromoId(promoCode._id || null);
												setDeleteModalOpen(true);
											}}>
											<Trash />
										</Button>
									</>
								)}
							</div>
						</Card>
					</Col>
				))}
			</Row>

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={deleteModalOpen}
				toggle={() => setDeleteModalOpen(false)}
				centered>
				<ModalHeader toggle={() => setDeleteModalOpen(false)}>
					Delete Promo Code
				</ModalHeader>
				<ModalBody>
					Are you sure you want to delete this promo code? This action cannot be
					undone.
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-danger'
						onClick={() => setDeleteModalOpen(false)}>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={handleDelete}>
						Yes, Delete
					</Button>
				</ModalFooter>
			</Modal>
		</Col>
	);
};

export default PromocodesCards;

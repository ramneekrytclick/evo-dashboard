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
	Spinner,
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
	const [loading, setLoading] = useState(true);

	const fetchPromoCodes = async () => {
		try {
			setLoading(true);
			const response = await getPromoCodes();
			setPromocodes(response.promoCodes);
		} catch (err) {
			toast.error("Failed to fetch promo codes");
			console.error("Failed to fetch promo codes", err);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!selectedPromoId) return;
		setLoading(true);
		toast.promise(deletePromocode(selectedPromoId), {
			pending: "Deleting promo code...",
			success: {
				render() {
					setDeleteModalOpen(false);
					setSelectedPromoId(null);
					fetchPromoCodes();
					setLoading(false);
					return "Promo code deleted successfully";
				},
			},
			error: {
				render({ data }) {
					setLoading(false);
					console.error(data);
					return "Failed to delete promo code.";
				},
			},
		});
	};

	useEffect(() => {
		fetchPromoCodes();
	}, []);

	const formatDate = (date: string | null | undefined) => {
		if (!date) return "—";
		return new Date(date).toLocaleDateString();
	};

	const isCourseSpecific = (promo: PromoCodeProps) => !!promo.course;

	if (loading) {
		return (
			<div className='text-center py-5'>
				<Spinner color='primary' />
				<p className='mt-3'>Loading promo codes...</p>
			</div>
		);
	}
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
								<h3 className='mb-1'>
									<strong
										className={`text-${
											promoCode.isActive ? "success" : "danger"
										}`}>
										{promoCode.code}
									</strong>
								</h3>

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
						disabled={loading}
						onClick={handleDelete}>
						{loading ? "Deleting..." : "Yes, Delete"}
					</Button>
				</ModalFooter>
			</Modal>
		</Col>
	);
};

export default PromocodesCards;

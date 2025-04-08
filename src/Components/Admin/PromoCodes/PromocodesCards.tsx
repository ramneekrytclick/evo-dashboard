"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getPromoCodes } from "@/app/api/admin/promo-codes";
import { PromoCodeProps } from "@/Types/Course.type";
import CreatePromocodeModal from "./CreatePromocodeModal";
import PausePromoModal from "./PausePromocodeModal";

const PromocodesCards = () => {
	const [promocodes, setPromocodes] = useState<PromoCodeProps[]>([]);

	const fetchPromoCodes = async () => {
		try {
			const response = await getPromoCodes();
			setPromocodes(response.promoCodes);
		} catch (err) {
			console.error("Failed to fetch promo codes", err);
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
			<Row className="ms-1 mb-4">
				<CreatePromocodeModal fetchData={fetchPromoCodes} />
			</Row>
			<Row style={{ height: "75vh", overflowY: "scroll" }}>
				{promocodes.map((promoCode) => (
					<Col
						sm={6}
						xl={4}
						className="my-2"
						key={promoCode._id}>
						<Card className="height-equal h-100 ribbon-wrapper-bottom text-dark">
							<div className="ribbon ribbon-dark ribbon-clip-bottom">
								{promoCode.discountPercentage}% OFF
							</div>
							<CardBody>
								<p className="mb-1">
									<strong>Promo Code:</strong> {promoCode.code}
								</p>

								{isCourseSpecific(promoCode) ? (
									<>
										<p className="mb-1">
											<strong>Applicable On:</strong>{" "}
											<span>
												Course – <strong>{promoCode.course?.title}</strong>
											</span>
										</p>
										<p className="mb-1">
											<strong>Valid Until:</strong>{" "}
											<em className="txt-danger">
												{formatDate(promoCode.validUntil)}
											</em>
										</p>
									</>
								) : (
									<>
										<p className="mb-1">
											<strong>Applicable On:</strong>{" "}
											<span className="text-warning">Overall</span>
										</p>
										<p className="mb-1">
											<strong>Usage Limit:</strong>{" "}
											{promoCode.usageLimit ?? "∞"}
										</p>
										<p className="mb-1">
											<strong>Used:</strong> {promoCode.usageCount}
										</p>
									</>
								)}

								<p className="mb-1">
									<strong>Status:</strong>{" "}
									{promoCode.isActive ? (
										<span className="text-success">Active</span>
									) : (
										<span className="text-danger">Inactive</span>
									)}
								</p>
							</CardBody>

							<div className="d-flex justify-content-end mt-3 gap-2">
								{promoCode._id && (
									<PausePromoModal
										isActive={promoCode.isActive}
										id={promoCode._id}
										fetchData={fetchPromoCodes}
									/>
								)}
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</Col>
	);
};

export default PromocodesCards;

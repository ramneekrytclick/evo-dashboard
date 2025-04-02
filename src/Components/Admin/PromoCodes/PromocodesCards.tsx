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
								<p>
									Promo Code: <strong>{promoCode.code}</strong>
									<br />
									Valid Until:{" "}
									<em className="txt-danger">
										{new Date(promoCode.validUntil).toLocaleDateString()}
									</em>
									<br />
									Applicable On:{" "}
									{promoCode.course ? (
										<span>
											Course - <strong>{promoCode.course.name}</strong>
										</span>
									) : (
										<span className="text-warning">Overall</span>
									)}
									<br />
									Status:{" "}
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

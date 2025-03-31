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
			setPromocodes(response);
		} catch (err) {
			console.error("Failed to fetch promo codes", err);
			setPromocodes([
				{
					_id: "67cc295414ecea43d4758b3e",
					code: "SAVE20",
					discountPercentage: 20,
					course: "67c7de0070211804ea1d4bb1",
					path: null,
					isActive: true,
					validUntil: "2025-12-31T00:00:00.000Z",
					createdAt: "2025-03-08T11:26:12.321Z",
					updatedAt: "2025-03-25T08:04:08.788Z",
					__v: 0,
				},
				{
					_id: "67e50973837ebe70bce7b52c",
					code: "SAVE200",
					discountPercentage: 20,
					course: "67c7de0070211804ea1d4bb1",
					path: null,
					validUntil: "2025-12-31T00:00:00.000Z",
					isActive: true,
					isGlobal: false,
					createdAt: "2025-03-27T08:16:51.882Z",
					updatedAt: "2025-03-27T08:16:51.882Z",
					__v: 0,
				},
				{
					_id: "67e509a0837ebe70bce7b52f",
					code: "SITE20",
					discountPercentage: 20,
					course: null,
					path: null,
					validUntil: "2025-05-10T00:00:00.000Z",
					isActive: true,
					isGlobal: true,
					createdAt: "2025-03-27T08:17:36.573Z",
					updatedAt: "2025-03-27T08:17:36.573Z",
					__v: 0,
				},
				{
					_id: "67e510c488730c3bede16080",
					code: "SAVE999",
					discountPercentage: 20,
					course: "67e266877665ba6a7b89345f",
					path: null,
					validUntil: "2025-12-31T00:00:00.000Z",
					isActive: true,
					isGlobal: false,
					createdAt: "2025-03-27T08:48:04.632Z",
					updatedAt: "2025-03-27T08:48:04.632Z",
					__v: 0,
				},
				{
					_id: "67e51a4631e07ae47c1e7847",
					code: "SAVE201",
					discountPercentage: 20,
					course: "67e266877665ba6a7b89345f",
					validUntil: "2025-04-30T00:00:00.000Z",
					usageLimit: null,
					usageCount: 0,
					isActive: true,
					createdAt: "2025-03-27T09:28:38.987Z",
					updatedAt: "2025-03-27T09:28:38.987Z",
					__v: 0,
				},
				{
					_id: "67e51a6c31e07ae47c1e784b",
					code: "SAVE2011",
					discountPercentage: 20,
					course: "67e266877665ba6a7b893451",
					validUntil: "2025-04-30T00:00:00.000Z",
					usageLimit: null,
					usageCount: 0,
					isActive: true,
					createdAt: "2025-03-27T09:29:16.192Z",
					updatedAt: "2025-03-27T09:29:16.192Z",
					__v: 0,
				},
				{
					_id: "67e51a8131e07ae47c1e784d",
					code: "OVERALL50",
					discountPercentage: 50,
					course: null,
					validUntil: null,
					usageLimit: 3,
					usageCount: 1,
					isActive: true,
					createdAt: "2025-03-27T09:29:37.429Z",
					updatedAt: "2025-03-27T09:29:55.063Z",
					__v: 0,
				},
				{
					_id: "67e51b5f7634797874b73a7e",
					code: "SAVE20111",
					discountPercentage: 20,
					course: "67e266877665ba6a7b89345f",
					validUntil: "2025-04-30T00:00:00.000Z",
					usageLimit: null,
					usageCount: 0,
					isActive: true,
					createdAt: "2025-03-27T09:33:19.185Z",
					updatedAt: "2025-03-27T09:33:19.185Z",
					__v: 0,
				},
			]);
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

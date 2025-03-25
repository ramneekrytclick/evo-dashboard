"use client";

import { getPromoCodes } from "@/app/api/admin/promo-codes";
import { PromoCodeProps } from "@/Types/Course.type";
import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import CreatePromocodeModal from "./CreatePromocodeModal";
import PausePromoModal from "./PausePromocodeModal";
import UpdatePromocodeModal from "./UpdatePromocodeModal";

const PromocodesCards = () => {
	const [promocodes, setPromocodes] = useState<PromoCodeProps[]>([]);
	const [editPromoCodeData, setEditPromoCodeData] =
		useState<PromoCodeProps | null>(null);

	const fetchPromoCodes = async () => {
		try {
			const response = await getPromoCodes();
			setPromocodes(response);
		} catch (error) {
			console.error("Failed to fetch promo codes:", error);
		}
	};

	useEffect(() => {
		fetchPromoCodes();
	}, []);

	return (
		<Col>
			<Row
				sm={6}
				className="ms-1 mb-4">
				<CreatePromocodeModal fetchData={fetchPromoCodes} />
			</Row>
			<Row>
				{promocodes?.map((promoCode, index) => {
					const {
						_id,
						code,
						discountPercentage,
						validUntil,
						isActive,
						course,
						path,
					} = promoCode;

					return (
						<Col
							sm={6}
							xl={4}
							className="my-2"
							key={index}>
							<Card
								color="light"
								className=" height-equal h-100 ribbon-wrapper-bottom text-dark">
								<div className="ribbon ribbon-dark ribbon-clip-bottom">
									{discountPercentage}% OFF
								</div>
								<CardBody>
									<p>
										<Fragment>
											Promo Code: <strong>{code}</strong>
										</Fragment>
										<br />
										<Fragment>
											Valid Until:{" "}
											<em className="txt-danger">
												{new Date(validUntil).toLocaleDateString()}
											</em>
										</Fragment>
										<br />
										<Fragment>
											Applicable On:{" "}
											{course ? (
												<span>
													Course - <strong>{course.name}</strong>
												</span>
											) : path ? (
												<span>
													Path - <strong>{path.name}</strong>
												</span>
											) : (
												<span className="text-warning">Not Assigned</span>
											)}
										</Fragment>
										<br />
										<Fragment>
											Status:{" "}
											{isActive ? (
												<span className="text-success">Active</span>
											) : (
												<span className="text-danger">Inactive</span>
											)}
										</Fragment>
									</p>
								</CardBody>

								<div className="d-flex justify-content-end mt-3 gap-2">
									<UpdatePromocodeModal
										values={promoCode}
										fetchData={fetchPromoCodes}
									/>
									<PausePromoModal
										isActive={isActive}
										id={_id!}
										fetchData={fetchPromoCodes}
									/>
								</div>
							</Card>
						</Col>
					);
				})}
			</Row>
		</Col>
	);
};

export default PromocodesCards;

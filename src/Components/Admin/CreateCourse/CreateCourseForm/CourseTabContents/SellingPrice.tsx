import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
	Button,
	Col,
	Form,
	Input,
	Label,
	ListGroup,
	ListGroupItem,
	Row,
} from "reactstrap";
import { toast } from "react-toastify";
import { PriceLearning, PromoCodes } from "@/Constant";
import SVG from "@/CommonComponent/SVG";
import { CourseFormProps, PromoCodeProps } from "@/Types/Course.type";
import { getPromoCodes } from "@/app/api/admin/promo-codes";
import ScrollBar from "react-perfect-scrollbar";
import { promoCodesFakeData } from "@/FakeData/admin/promocodes";

interface SellingPriceProps {
	activeCallBack: (tab: number) => void;
	data: CourseFormProps;
	setData: (data: CourseFormProps) => void;
	submitFunction: (e: FormEvent) => void;
}

const SellingPrice: React.FC<SellingPriceProps> = ({
	activeCallBack,
	data,
	setData,
	submitFunction,
}) => {
	const [formData, setFormData] = useState({ initialCost: "" });
	const [promoCode, setPromoCode] = useState<string[]>([]);
	const { initialCost } = formData;
	const [promoCodes, setPromoCodes] = useState<PromoCodeProps[]>([]);

	const updateFormData = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const fetchPromoCodes = async () => {
		try {
			const response = await getPromoCodes();
			console.log(response.promoCodes);
			setPromoCodes(response.promoCodes);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchPromoCodes();
	}, []);

	const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const promoCodeId = e.target.value;

		// Check if the promoCode is already in the array
		setPromoCode((prevPromoCodes) => {
			if (prevPromoCodes.includes(promoCodeId)) {
				// Remove the promoCode from the array if already selected
				const updatedPromoCodes = prevPromoCodes.filter(
					(id) => id !== promoCodeId
				);
				setData({
					...data,
				});
				return updatedPromoCodes;
			} else {
				// Add the promoCode to the array if it's not already selected
				const updatedPromoCodes = [...prevPromoCodes, promoCodeId];
				setData({
					...data,
				});
				return updatedPromoCodes;
			}
		});
	};

	useEffect(() => {
		setData({
			...data,
		});
	}, [formData]);

	return (
		<div className="sidebar-body">
			<Form className="price-wrapper">
				<Row className="g-3 custom-input">
					<Col sm={6}>
						<Label>
							{PriceLearning} <span className="txt-danger">{"*"}</span>
						</Label>
						<Input
							type="number"
							name="initialCost"
							value={initialCost}
							onChange={updateFormData}
						/>
					</Col>
					<Col sm={6}>
						<Label>{PromoCodes}</Label>
						<ScrollBar
							className="scroll-demo scroll-b-none"
							style={{ width: "100%", height: "22.5em" }}>
							<ListGroup>
								{promoCodes?.map((item, index) => (
									<ListGroupItem
										className="list-group-item-action list-hover-primary"
										key={index}>
										<Input
											type="checkbox"
											name="promoCode"
											value={item._id}
											checked={promoCode.includes(item._id!)}
											onChange={handlePromoCodeChange}
											className="me-2"
										/>
										<Label check>{item.code}</Label>
									</ListGroupItem>
								))}
							</ListGroup>
						</ScrollBar>
					</Col>
				</Row>
				<div className="product-buttons">
					<Button
						color="transparent"
						className="me-1"
						onClick={() => activeCallBack(3)}>
						<div className="d-flex align-items-center gap-sm-2 gap-1">
							<SVG iconId="back-arrow" /> {"Previous"}
						</div>
					</Button>
					<Button
						color="transparent"
						onClick={submitFunction}>
						<div className="d-flex align-items-center gap-sm-2 gap-1">
							{"Submit"} <SVG iconId="front-arrow" />
						</div>
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default SellingPrice;

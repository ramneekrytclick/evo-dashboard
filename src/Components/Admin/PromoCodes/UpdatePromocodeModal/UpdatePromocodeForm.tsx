"use client";

import { updatePromoCode } from "@/app/api/admin/promo-codes";
import { PromoCodeProps } from "@/Types/Course.type";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface UpdatePromoCodeFormProps {
	toggle: () => void;
	values: any;
	fetchData: () => Promise<void>;
}

const UpdatePromoCodeForm = ({
	toggle,
	values,
	fetchData,
}: UpdatePromoCodeFormProps) => {
	const [formData, setFormData] = useState<any>({
		code: values.code,
		discountPercentage: values.discountPercentage,
		expiryDate: values.expiryDate,
		usageLimit: values.usageLimit,
		usedCount: values.usedCount,
		category: values.category,
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await updatePromoCode(formData, values._id!);
			toast.success("Updated successfully");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			alert("Error updating promo code.");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="code">Promo Code</Label>
					<Input
						id="code"
						type="text"
						value={formData.code}
						onChange={(e) => setFormData({ ...formData, code: e.target.value })}
						disabled
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="discountPercentage">Discount Percentage</Label>
					<Input
						id="discountPercentage"
						type="number"
						value={formData.discountPercentage}
						onChange={(e) =>
							setFormData({ ...formData, discountPercentage: +e.target.value })
						}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="expiryDate">Expiry Date</Label>
					<Input
						id="expiryDate"
						type="date"
						value={new Date(formData.expiryDate).toISOString().split("T")[0]}
						onChange={(e) =>
							setFormData({
								...formData,
								expiryDate: new Date(e.target.value).toDateString(),
							})
						}
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="usageLimit">Usage Limit</Label>
					<Input
						id="usageLimit"
						type="number"
						value={formData.usageLimit}
						onChange={(e) =>
							setFormData({ ...formData, usageLimit: +e.target.value })
						}
					/>
				</Col>
				<Col md={12}>
					<Button color="primary">Update Promo Code</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default UpdatePromoCodeForm;

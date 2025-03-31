import React, { useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { XCircle } from "react-feather";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import Image from "next/image";
import { removeFromCourseCart } from "@/Redux/Reducers/Courses/CourseCartSlice";
import CartBodyContent from "./CartBodyContent";
import { toast } from "react-toastify";
import { applyPromoCodeAndPurchase } from "@/app/api/student";

const CartTableBody = () => {
	const dispatch = useAppDispatch();
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	const [promoCodes, setPromoCodes] = useState<{ [key: string]: string }>({});
	const [promoDiscounts, setPromoDiscounts] = useState<{
		[key: string]: number;
	}>({});

	const handlePromoCodeChange = (courseId: string, value: string) => {
		setPromoCodes((prev) => ({
			...prev,
			[courseId]: value,
		}));
	};

	const applyPromoCode = async (courseId: string) => {
		const enteredCode = promoCodes[courseId];
		try {
			toast.info(`Applying promo code "${enteredCode}"...`);
			const response = await applyPromoCodeAndPurchase({
				code: enteredCode,
				courseId,
			});

			if (response?.discountPercentage) {
				setPromoDiscounts((prev) => ({
					...prev,
					[courseId]: response.discountPercentage,
				}));
				toast.success("Promo code applied successfully!");
			} else {
				toast.error("Invalid promo code");
			}
		} catch (error) {
			toast.error("Error applying promo code");
			console.error(error);
		}
	};

	const calculateDiscountedPrice = (
		original: number,
		discountPercent: number
	) => {
		return Math.max(0, original - (original * discountPercent) / 100);
	};

	return (
		<tbody>
			{courseCartData.map((item, i) => {
				const discountPercent = promoDiscounts[item._id] || 0;
				const finalPrice = calculateDiscountedPrice(
					item.discountedPrice,
					discountPercent
				);

				return (
					<tr key={item._id || i}>
						<td>
							<XCircle
								className="text-danger cursor-pointer"
								onClick={() => dispatch(removeFromCourseCart(item._id))}
							/>
						</td>
						<td>
							<Image
								width={60}
								height={60}
								className="img-fluid img-60 b-r-5"
								src={
									item.photo
										? `/${item.photo}`
										: "/assets/images/ecommerce/placeholder.jpg"
								}
								alt={item.title}
							/>
						</td>
						<td
							className="text-truncate"
							style={{ maxWidth: "200px" }}>
							{item.title}
						</td>
						<td>₹{item.discountedPrice}</td>
						<td>
							<InputGroup>
								<Input
									type="text"
									placeholder="Enter Promocode"
									value={promoCodes[item._id] || ""}
									onChange={(e) =>
										handlePromoCodeChange(item._id, e.target.value)
									}
								/>
								<Button
									color="primary"
									onClick={() => applyPromoCode(item._id)}>
									Apply
								</Button>
							</InputGroup>
							{discountPercent > 0 && (
								<small className="text-success d-block mt-1">
									-{discountPercent}% applied
								</small>
							)}
						</td>
						<td>
							<strong>₹{finalPrice.toFixed(2)}</strong>
						</td>
					</tr>
				);
			})}
			<CartBodyContent promoDiscounts={promoDiscounts} />
		</tbody>
	);
};

export default CartTableBody;

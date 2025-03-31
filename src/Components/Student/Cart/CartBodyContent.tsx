import React from "react";
import Link from "next/link";
import { Button, Input, InputGroup } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";

const CartBodyContent = () => {
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	const getTotal = () => {
		return courseCartData.reduce((sum, item) => sum + item.discountedPrice, 0);
	};

	return (
		<>
			<tr>
				<td colSpan={4}>
					<InputGroup>
						<Input
							className="me-2"
							type="text"
							placeholder="Enter coupon code"
						/>
						<Button color="primary">Apply</Button>
					</InputGroup>
				</td>
				<td className="total-amount">
					<h3 className="m-0 text-end">
						<span className="f-w-600">Total Price :</span>
					</h3>
				</td>
				<td colSpan={2}>
					<span>₹{getTotal()}</span>
				</td>
			</tr>
			<tr>
				<td
					className="text-end"
					colSpan={6}>
					<Link
						href="/student/courses"
						className="btn btn-secondary cart-btn-transform">
						Continue Browsing
					</Link>
				</td>
				<td>
					<Link
						href="/student/course/checkout"
						className="btn btn-success cart-btn-transform">
						Check Out
					</Link>
				</td>
			</tr>
		</>
	);
};

export default CartBodyContent;

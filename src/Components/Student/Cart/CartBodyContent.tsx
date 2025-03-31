import React from "react";
import Link from "next/link";
import { Button, Input, InputGroup } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";
import { enrollInCourse } from "@/app/api/student";
import { toast } from "react-toastify";

const CartBodyContent = () => {
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	const getTotal = () => {
		return courseCartData.reduce((sum, item) => sum + item.discountedPrice, 0);
	};
	const enrollInCourses = () => {
		courseCartData.forEach((item) => {
			try {
				enroll(item._id);
				toast.success(`Course ${item._id} Enrolled Successfully`);
			} catch (error) {
				toast.error(`Error Enrolling Course ${item._id}`);
				console.error(error);
			}
		});
	};
	const enroll = async (id: string) => {
		const response = await enrollInCourse(id);
		return response;
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
						href="#" //will be replaced with the checkout page
						onClick={enrollInCourses}
						className="btn btn-success cart-btn-transform">
						Check Out
					</Link>
				</td>
			</tr>
		</>
	);
};

export default CartBodyContent;

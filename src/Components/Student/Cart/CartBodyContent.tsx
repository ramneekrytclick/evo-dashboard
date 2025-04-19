import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/Redux/Hooks";
import { enrollInCourse } from "@/app/api/student";
import { toast } from "react-toastify";

const CartBodyContent = ({ promoDiscounts = {} as Record<string, number> }) => {
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	const calculateDiscountedPrice = (
		original: number,
		discountPercent: number
	) => {
		return Math.max(0, original - (original * discountPercent) / 100);
	};

	const getTotal = () => {
		return courseCartData.reduce((sum, item) => {
			const discount = promoDiscounts[item._id] || 0;
			const finalPrice = calculateDiscountedPrice(
				item.discountedPrice,
				discount
			);
			return sum + finalPrice;
		}, 0);
	};

	const enrollInCourses = async () => {
		try {
			await Promise.all(
				courseCartData.map(async (item) => {
					await enrollInCourse(item._id);
					toast.success(`Course ${item._id} Enrolled Successfully`);
				})
			);
		} catch (error) {
			toast.error("Error Enrolling in Courses");
			console.error(error);
		}
	};

	return (
		<>
			<tr>
				<td colSpan={4}></td>
				<td className='total-amount'>
					<h3 className='m-0 text-end'>
						<span className='f-w-600'>Total Price :</span>
					</h3>
				</td>
				<td colSpan={2}>
					<span>₹{getTotal().toFixed(2)}</span>
				</td>
			</tr>
			<tr>
				<td
					className='text-end'
					colSpan={6}>
					<Link
						href='/student/learning/courses'
						className='btn btn-secondary cart-btn-transform'>
						Continue Browsing
					</Link>
				</td>
				<td>
					<Link
						href='#'
						onClick={enrollInCourses}
						className='btn btn-success cart-btn-transform'>
						Check Out
					</Link>
				</td>
			</tr>
		</>
	);
};

export default CartBodyContent;

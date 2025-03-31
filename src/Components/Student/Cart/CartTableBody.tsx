import React from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { XCircle } from "react-feather";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import Image from "next/image";
import { removeFromCourseCart } from "@/Redux/Reducers/Courses/CourseCartSlice";
import CartBodyContent from "./CartBodyContent";

const CartTableBody = () => {
	const dispatch = useAppDispatch();
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	return (
		<tbody>
			{courseCartData.map((item, i) => (
				<tr key={item._id || i}>
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
					<td>₹{item.realPrice}</td>
					<td>₹{item.discountedPrice}</td>
					<td>1</td>
					<td>
						<XCircle
							className="text-danger cursor-pointer"
							onClick={() => dispatch(removeFromCourseCart(item._id))}
						/>
					</td>
					<td>₹{item.discountedPrice}</td>
				</tr>
			))}
			<CartBodyContent />
		</tbody>
	);
};

export default CartTableBody;

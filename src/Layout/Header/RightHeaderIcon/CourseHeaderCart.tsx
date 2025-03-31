import SVG from "@/CommonComponent/SVG";
import { Dollar, Href, ImagePath, Rupees } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { removeFromCourseCart } from "@/Redux/Reducers/Courses/CourseCartSlice";
import Image from "next/image";
import Link from "next/link";
import { Button, Col } from "reactstrap";

const HeaderCartCourse = () => {
	const dispatch = useAppDispatch();
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	const calculateSubtotal = (): number =>
		courseCartData.reduce((total, course) => total + course.discountedPrice, 0);

	return (
		<li className="cart-nav onhover-dropdown ">
			<div className="cart-box">
				<SVG iconId="fill-Buy" />
				{courseCartData.length > 0 && (
					<span className="badge bg-primary rounded-pill cart-count">
						{courseCartData.length}
					</span>
				)}
			</div>

			<div className="cart-dropdown onhover-show-div w-fit">
				<h6 className="f-18 mb-0 dropdown-title">Course Cart</h6>

				<ul>
					{courseCartData.length > 0 ? (
						courseCartData.map((course, index) => (
							<li key={index}>
								<div className="d-flex align-items-start">
									<Image
										className="img-fluid b-r-5 img-60"
										src={
											course.photo
												? `/${course.photo}`
												: `${ImagePath}/ecommerce/placeholder.jpg`
										}
										width={60}
										height={65}
										alt={course.title}
									/>
									<div className="flex-grow-1 px-2">
										<span className="fw-semibold d-block text-wrap mb-1">
											{course.title}
										</span>
										<h6 className="text-success mb-0">
											₹{course.discountedPrice}
										</h6>
										<small className="text-muted text-decoration-line-through">
											₹{course.realPrice}
										</small>
									</div>
									<div className="close-circle">
										<i
											className="fa fa-times cursor-pointer"
											onClick={() => dispatch(removeFromCourseCart(course._id))}
										/>
									</div>
								</div>
							</li>
						))
					) : (
						<Col
							sm={12}
							className="empty-cart-cls text-center">
							<Image
								height={172}
								width={172}
								src={`${ImagePath}/ecommerce/icon-empty-cart.png`}
								className="img-fluid mb-4 mt-4"
								alt="Empty Cart"
							/>
							<h3>
								<strong>Your Cart is Empty</strong>
							</h3>
							<h4>Start learning something awesome!</h4>
							<Link
								className="btn btn-primary cart-btn-transform mt-3 mb-4"
								href="/student/courses">
								Browse Courses
							</Link>
						</Col>
					)}

					{courseCartData.length > 0 && (
						<>
							<li className="total">
								<h5 className="mb-0">
									Subtotal :
									<span className="f-right">
										{Rupees}
										{calculateSubtotal()}
									</span>
								</h5>
							</li>

							<li className="d-flex justify-content-between">
								<Link
									className="view-cart w-100 h-100"
									href="/student/cart">
									<Button
										color={"success"}
										className="w-100 h-100">
										View Cart
									</Button>
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</li>
	);
};

export default HeaderCartCourse;

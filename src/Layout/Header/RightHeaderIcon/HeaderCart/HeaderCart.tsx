import SVG from "@/CommonComponent/SVG";
import { Dollar, Href, ImagePath } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { removeFromCart } from "@/Redux/Reducers/ECommerce/ProductReducer";
import { ProductDataTypes } from "@/Types/ECommerce.type";
import Image from "next/image";
import Link from "next/link";
import { Col } from "reactstrap";

const HeaderCart = () => {
	const dispatch = useAppDispatch();
	const { cartData } = useAppSelector((state) => state.product);

	const calculateItemTotal = (item: ProductDataTypes): number =>
		item.quantity ? item.quantity * item.price : 0;

	const calculateCartSubtotal = (): number =>
		cartData.reduce((total, item) => total + calculateItemTotal(item), 0);

	return (
		<li className="cart-nav onhover-dropdown">
			<div className="cart-box">
				<SVG iconId="fill-Buy" />
			</div>

			<div className="cart-dropdown onhover-show-div">
				<h6 className="f-18 mb-0 dropdown-title">Cart</h6>

				<ul>
					{cartData.length > 0 ? (
						cartData.map((item, index) => (
							<li key={index}>
								<div className="d-flex align-items-start">
									<Image
										className="img-fluid b-r-5 img-60"
										src={`${ImagePath}/${item.image}`}
										width={60}
										height={65}
										alt={item.name}
									/>
									<div className="flex-grow-1 px-2">
										<span className="d-block text-truncate fw-bold">
											{item.name}
										</span>
										<h6 className="mb-0">
											{Dollar}
											{item.price}
										</h6>
									</div>
									<div className="close-circle">
										<i
											className="fa fa-times cursor-pointer"
											onClick={() => dispatch(removeFromCart(item.id))}
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
							<h4>Add something to make me happy</h4>
							<Link
								href="/app/ecommerce/product"
								className="btn btn-primary cart-btn-transform mt-3 mb-4">
								Continue Shopping
							</Link>
						</Col>
					)}

					{cartData.length > 0 && (
						<>
							<li className="total">
								<h5 className="mb-0">
									Subtotal :
									<span className="f-right">
										{Dollar}
										{calculateCartSubtotal()}
									</span>
								</h5>
							</li>

							<li className="d-flex justify-content-between">
								<Link
									className="view-cart"
									href="/ecommerce/cart">
									View Cart
								</Link>
								<Link
									className="view-checkout f-right"
									href="/ecommerce/checkout">
									Checkout
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</li>
	);
};

export default HeaderCart;

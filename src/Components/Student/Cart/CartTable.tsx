"use client";

import React from "react";
import { Row, Table } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";
import EmptyCart from "./EmptyCart";
import CartTableBody from "./CartTableBody";

const cartTableHead = [
	"Remove",
	"Course",
	"Course Name",
	"Price",
	"PromoCode",
	"Total",
];

const CartTable = () => {
	const { courseCartData } = useAppSelector((state) => state.courseCart);

	return (
		<Row>
			{courseCartData && courseCartData.length > 0 ? (
				<div className="order-history table-responsive custom-scrollbar wishlist">
					<Table bordered>
						<thead>
							<tr>
								{cartTableHead.map((heading, i) => (
									<th key={i}>{heading}</th>
								))}
							</tr>
						</thead>
						<CartTableBody />
					</Table>
				</div>
			) : (
				<EmptyCart />
			)}
		</Row>
	);
};

export default CartTable;

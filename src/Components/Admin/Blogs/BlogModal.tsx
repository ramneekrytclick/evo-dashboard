"use client";

import { approveBlog } from "@/app/api/admin/blogs/blog";
import Link from "next/link";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
	Button,
	CardLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";

interface BlogModalProps {
	fetchData: () => Promise<any>;
	item: {
		id: string;
		title: string;
		text: string; // HTML content
		status: string;
	};
}

const BlogModal = ({ item, fetchData }: BlogModalProps) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal((prev) => !prev);

	const handleApprove = async () => {
		try {
			await approveBlog(item.id, "Approved");
			await fetchData();
			toggle();
			toast.success("Blog approved successfully");
		} catch (error) {
			console.error(error);
			toast.error("Failed to approve blog");
		}
	};

	const handleReject = async () => {
		try {
			await approveBlog(item.id, "Rejected");
			await fetchData();
			toggle();
			toast.success("Blog rejected successfully");
		} catch (error) {
			console.error(error);
			toast.error("Failed to reject blog");
		}
	};

	return (
		<>
			<CardLink
				color='info'
				onClick={toggle}>
				<Link href='#'>{item.title}</Link>
			</CardLink>

			<Modal
				isOpen={modal}
				toggle={toggle}
				size='xl'
				centered
				className='blog-modal'>
				<ModalHeader toggle={toggle}>
					<span className='fs-2 fw-bold'>{item.title}</span>
				</ModalHeader>
				<ModalBody style={{ maxHeight: "78vh", overflowY: "auto" }}>
					<div
						style={{
							lineHeight: "1.8",
							fontSize: "1.1rem",
							color: "#333",
							wordBreak: "break-word",
						}}
						dangerouslySetInnerHTML={{ __html: item.text }}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						color={item.status === "Approved" ? "danger" : "success"}
						onClick={item.status === "Approved" ? handleReject : handleApprove}>
						{item.status === "Approved" ? "Reject Blog" : "Approve Blog"}
					</Button>
					<Button
						color='outline-primary'
						onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default BlogModal;

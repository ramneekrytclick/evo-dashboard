import { approveBlog } from "@/app/api/admin/blogs/blog";
import CommonModal from "@/CommonComponent/CommonModal";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ChevronsRight } from "react-feather";
import { toast } from "react-toastify";
import { Button, CardLink } from "reactstrap";

interface BlogModalProps {
	fetchData: () => Promise<any>;
	item: {
		id: string;
		title: string;
		text: string;
		status: string;
	};
}

const BlogModal = ({ item, fetchData }: BlogModalProps) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const handleApprove = async () => {
		try {
			const response = await approveBlog(item.id, "Approved");
			fetchData();
			toggle();
			toast.success("Approved blog successfully");
		} catch (error) {
			console.error(error);
		}
	};
	const handleReject = async () => {
		try {
			const response = await approveBlog(item.id, "Rejected");
			fetchData();
			toggle();
			toast.success("Rejected blog successfully");
		} catch (error) {
			console.error(error);
		}
	};
	const data = {
		isOpen: modal,
		header: true,
		toggler: toggle,
		center: true,
		title: item.title,
		size: "xl",
		bodyClass: "dark-modal",
	};
	return (
		<>
			<CardLink
				color="info"
				onClick={toggle}>
				<Link href={""}>{item.title}</Link>
			</CardLink>
			<CommonModal modalData={data}>
				<Fragment>
					<p className="modal-padding-space">{item.text}</p>
					<div className="text-end">
						<Button
							color={item.status === "Approved" ? "danger" : "success"}
							className="mx-2 cursor-pointer"
							onClick={
								item.status === "Approved" ? handleReject : handleApprove
							}>
							{item.status === "Approved" ? "Reject Blog" : "Approve Blog"}
						</Button>
					</div>
				</Fragment>
			</CommonModal>
		</>
	);
};

export default BlogModal;

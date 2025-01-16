import { approveBlog } from "@/app/api/admin/blogs/blog";
import CommonModal from "@/CommonComponent/CommonModal";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Button, CardLink } from "reactstrap";

interface BlogModalProps {
	item: {
		id: string;
		title: string;
		text: string;
		status: string;
	};
}

const BlogModal = ({ item }: BlogModalProps) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const handleApprove = async()=>{
		try {
			const response = await approveBlog(item.id);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
	const data = {
		isOpen: modal,
		header: true,
		toggler: toggle,
		center:true,
		title: item.title,
		size: "xl",
		bodyClass: "dark-modal",
	};
	return (
		<>
			<CardLink
				color="info"
				onClick={toggle}>
					<Link href={""}>
					{item.title}
					</Link>
			</CardLink>
			<CommonModal modalData={data}>
				<Fragment>
					{/* <div className="large-modal-header">
						<ChevronsRight />
						<h3 className="mb-2">{item.title}</h3>
					</div> */}
					<p className="modal-padding-space">{item.text}</p>
					<div className="text-end">
						<Button color="success" className="mx-2" onClick={handleApprove}>Approve</Button>
					</div>
				</Fragment>
			</CommonModal>
		</>
	);
};

export default BlogModal
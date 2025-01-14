import CommonModal from "@/CommonComponent/CommonModal";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Button, CardLink } from "reactstrap";

interface BlogModalProps {
	item: {
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
					<div className="text-center">
						<Button color="danger" className="mx-2">Reject</Button>
						<Button color="success" className="mx-2">Approve</Button>
					</div>
				</Fragment>
			</CommonModal>
		</>
	);
};

export default BlogModal
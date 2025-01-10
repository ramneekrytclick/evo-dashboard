import CommonModal from "@/CommonComponent/CommonModal";
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
				{item.title}
			</CardLink>
			<CommonModal modalData={data}>
				<Fragment>
					{/* <div className="large-modal-header">
						<ChevronsRight />
						<h3 className="mb-2">{item.title}</h3>
					</div> */}
					<p className="modal-padding-space">{item.text}</p>
					<div className="text-center">
						<Button outline color="danger">Reject</Button>
						<Button color="success">Approve</Button>
					</div>
				</Fragment>
			</CommonModal>
		</>
	);
};

export default BlogModal
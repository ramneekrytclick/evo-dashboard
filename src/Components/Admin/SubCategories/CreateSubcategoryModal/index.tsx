import CommonModal from "@/CommonComponent/CommonModal";
import { createSubcategoryTitle } from "@/Constant";
import { useState } from "react";
import { Button } from "reactstrap";
import CreateSubcategoryForm from "./CreateSubcategoryForm";

const CreateSubcategoryModal = ({
	fetchData,
	id,
}: {
	fetchData: () => Promise<void>;
	id: string;
}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		bodyClass: "dark-sign-up social-profile text-start",
	};

	return (
		<>
			<Button
				color="primary"
				className="me-2 px-2"
				onClick={toggle}>
				<i className="fa fa-plus me-2 py-1" /> Create New Subcategory
			</Button>
			{/* <i className="icon-pencil-alt" onClick={toggle}/> */}
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{`Create New Subcategory under Category ${id}`}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<CreateSubcategoryForm
						fetchData={fetchData}
						toggle={toggle}
						id={id}
					/>
				</div>
			</CommonModal>
		</>
	);
};

export default CreateSubcategoryModal;

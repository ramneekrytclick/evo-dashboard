import CommonModal from "@/CommonComponent/CommonModal";
import { useState } from "react";
import { Button } from "reactstrap";
import CreateSubcategoryForm from "./CreateSubcategoryForm";

const CreateSubcategoryModal = ({
	fetchData,
	category,
	sm,
}: {
	fetchData: () => Promise<void>;
	category: { id?: string; categoryName?: string };
	sm?: boolean;
}) => {
	const [modal, setModal] = useState(false);
	const { id, categoryName } = category;
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
				color='primary'
				className='w-100'
				outline={sm}
				size={sm ? "sm" : ""}
				onClick={toggle}>
				<i className='fa fa-plus me-2 py-1' /> Add Subcategory{" "}
				{id && `under Category ${categoryName}`}
			</Button>
			{/* <i className="icon-pencil-alt" onClick={toggle}/> */}
			<CommonModal modalData={ModalData}>
				<div className='modal-toggle-wrapper'>
					{id ? (
						<h3 className='mb-3'>{`Add Subcategory under Category ${id}`}</h3>
					) : (
						<h3 className='mb-3'>{"Add Subcategory"}</h3>
					)}
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

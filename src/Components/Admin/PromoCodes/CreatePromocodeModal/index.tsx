import CommonModal from "@/CommonComponent/CommonModal";
import { createPromoCodeTitle } from "@/Constant";
import { useState } from "react";
import { Button } from "reactstrap";
import CreatePromocodeForm from "./CreatePromocodeForm";



const CreatePromocodeModal = ({fetchData}:{fetchData:()=>Promise<void>}) => {
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
				{/* <i className="fa fa-plus me-2" /> */}
				<i className="fa fa-plus me-2 py-1" /> Create New Promocode
			</Button>
			{/* <i className="icon-pencil-alt" onClick={toggle}/> */}
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{createPromoCodeTitle}</h3>
					{/* <p>{"Fill in your information below to continue."}</p> */}
					<CreatePromocodeForm fetchData={fetchData} toggle={toggle} />
				</div>
			</CommonModal>
		</>
	);
}

export default CreatePromocodeModal;
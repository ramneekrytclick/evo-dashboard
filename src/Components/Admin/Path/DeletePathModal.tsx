import { deletePathConfirmTitle, ImagePath } from "@/Constant";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import CommonModal from "@/CommonComponent/CommonModal";
import Image from "next/image";
import { deletePath } from "@/app/api/admin/path";
import { toast } from "react-toastify";
import { Trash, Trash2 } from "react-feather";

const DeletePathModal = ({
	id,
	fetchData,
}: {
	id: string;
	fetchData: () => Promise<void>;
}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		center: true,
		bodyClass: "dark-sign-up social-profile text-start",
	};
	const handleDelete = async () => {
		try {
			const response = await deletePath(id);
			toast.success("Deleted Successfully");
			toggle();
			fetchData();
		} catch (error) {
			console.error(error);
			toast.error("Error Deleting");
		}
	};
	return (
		<>
			<Button
				color='danger'
				className=' p-2 d-flex  align-items-center justify-content-center'
				style={{ width: "35px", height: "35px" }}
				onClick={toggle}>
				<Trash size={18} />
			</Button>
			<Modal
				isOpen={modal}
				toggle={toggle}>
				<div className='modal-toggle-wrapper text-center'>
					<ModalHeader>
						<h3 className=''>{deletePathConfirmTitle}</h3>
					</ModalHeader>
					<ModalBody>
						<p>
							Are you sure you want to delete this path?
							<br />
						</p>
					</ModalBody>
					<ModalFooter>
						<div className='block text-center'>
							<Button
								outline
								className='me-2'
								color='danger'
								onClick={toggle}>
								Close
							</Button>
							<Button
								color='danger'
								className='ms-2'
								onClick={handleDelete}>
								Confirm
							</Button>
						</div>
					</ModalFooter>
				</div>
			</Modal>
		</>
	);
};
export default DeletePathModal;

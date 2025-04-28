import { deletePathConfirmTitle, ImagePath } from "@/Constant";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deletePath } from "@/app/api/admin/path";
import { toast } from "react-toastify";

const DeletePathModal = ({
	id,
	fetchData,
	modal,
	toggle,
}: {
	id: string;
	fetchData: () => Promise<void>;
	modal: boolean;
	toggle: () => void;
}) => {
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

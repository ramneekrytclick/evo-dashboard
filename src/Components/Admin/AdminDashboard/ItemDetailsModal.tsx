import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ItemDetailsModal = ({
	isOpen,
	toggle,
	title,
	data,
}: {
	isOpen: boolean;
	toggle: () => void;
	title: string;
	data: any;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered
			size='xl'>
			<ModalHeader toggle={toggle}>{title}</ModalHeader>
			<ModalBody>
				{data ? (
					<div className='row'>
						{Object.entries(data).map(([key, value]) => (
							<div
								className='col-6 mb-3'
								key={key}>
								<strong>{key.replace(/([A-Z])/g, " $1")}:</strong>{" "}
								{typeof value === "object"
									? JSON.stringify(value)
									: String(value || "-")}
							</div>
						))}
					</div>
				) : (
					<p>No data</p>
				)}
			</ModalBody>
			<ModalFooter>
				<Button
					color='primary'
					onClick={toggle}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ItemDetailsModal;

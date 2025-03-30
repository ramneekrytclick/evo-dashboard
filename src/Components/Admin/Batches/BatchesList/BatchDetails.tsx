// components/BatchDetails.tsx
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { BatchProps } from "@/Types/Course.type";

const BatchDetails = ({
	batch,
	isOpen,
	toggle,
}: {
	batch: BatchProps;
	isOpen: boolean;
	toggle: () => void;
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size="lg">
			<ModalHeader toggle={toggle}>Batch Details - {batch.name}</ModalHeader>
			<ModalBody>
				<p>
					<strong>Description:</strong> {batch.description || "—"}
				</p>
				<p>
					<strong>Time:</strong> {batch.time || "—"}
				</p>
				<p>
					<strong>Days:</strong> {batch.batchWeekType || "—"}
				</p>
				<p>
					<strong>Start:</strong>{" "}
					{new Date(batch.startDate).toLocaleDateString()}
				</p>
				<p>
					<strong>End:</strong> {new Date(batch.endDate).toLocaleDateString()}
				</p>
				<p>
					<strong>Students:</strong> {batch.students?.length || 0}
				</p>
				<p>
					<strong>Mentor:</strong> {batch.mentor || "Unassigned"}
				</p>
				<p>
					<strong>Course ID:</strong> <code>{batch.course}</code>
				</p>
				<p>
					<strong>Chat Messages:</strong> {batch.chatMessages?.length || 0}
				</p>
			</ModalBody>
		</Modal>
	);
};

export default BatchDetails;

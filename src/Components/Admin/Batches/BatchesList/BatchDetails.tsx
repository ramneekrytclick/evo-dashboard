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
	const courseDisplay = () => {
		if (!batch.course) return "—";

		if (typeof batch.course === "string") {
			return <code>{batch.course}</code>;
		}

		return (
			<>
				<strong>Course Title:</strong> {batch.course?.title} <br />
				<strong>Course ID:</strong> <code>{batch.course?._id}</code>
			</>
		);
	};

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
					{batch.startDate
						? new Date(batch.startDate).toLocaleDateString()
						: "—"}
				</p>
				<p>
					<strong>End:</strong>{" "}
					{batch.endDate ? new Date(batch.endDate).toLocaleDateString() : "—"}
				</p>
				<p>
					<strong>Students:</strong> {batch.students?.length || 0}
				</p>
				<p>
					<strong>Mentor:</strong>{" "}
					{typeof batch.mentor === "object"
						? batch.mentor?.name || "Unassigned"
						: batch.mentor || "Unassigned"}
				</p>
				<p>{courseDisplay()}</p>
			</ModalBody>
		</Modal>
	);
};

export default BatchDetails;

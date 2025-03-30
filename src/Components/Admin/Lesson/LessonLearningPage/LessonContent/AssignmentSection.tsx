import { useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Assignment } from "@/Types/Lesson.type";
import DeleteAssignmentModal from "../Assignment/DeleteAssignmentModal";

const AssignmentSection = ({
	assignments,
	lessonId,
}: {
	assignments: Assignment[];
	lessonId: string;
}) => {
	const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
	const [showModal, setShowModal] = useState(false);

	const handleDelete = (index: number) => {
		setDeleteIndex(index);
		setShowModal(true);
	};

	const confirmDelete = () => {
		if (deleteIndex !== null) {
			console.log("Delete assignment:", deleteIndex); // Replace with actual API call
			setShowModal(false);
		}
	};

	return assignments.length > 0 ? (
		<>
			<ul>
				{assignments.map((ass, i) => (
					<Card
						key={i}
						className="my-3 bg-light-warning">
						<CardBody>
							<li>
								<b>{ass.title}</b>
								<p>{ass.description}</p>
								{ass.attachmentUrl && (
									<a
										href={`/uploads/${ass.attachmentUrl}`}
										target="_blank"
										rel="noopener noreferrer">
										View Attachment
									</a>
								)}
								<div className="mt-2">
									<Button
										size="sm"
										color="danger"
										onClick={() => handleDelete(i)}>
										Delete
									</Button>
								</div>
							</li>
						</CardBody>
					</Card>
				))}
			</ul>

			{deleteIndex !== null && (
				<DeleteAssignmentModal
					isOpen={showModal}
					toggle={() => setShowModal(false)}
					onConfirm={confirmDelete}
					assignmentTitle={assignments[deleteIndex].title}
				/>
			)}
		</>
	) : (
		<p className="text-muted">No assignments available</p>
	);
};

export default AssignmentSection;

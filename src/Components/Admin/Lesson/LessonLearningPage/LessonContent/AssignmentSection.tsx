import { useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Assignment } from "@/Types/Lesson.type";
import EditAssignmentModal from "../Assignment/EditAssignmentModal";

const AssignmentSection = ({
	assignments,
	lessonId,
	onSave,
}: {
	assignments: Assignment[];
	lessonId: string;
	onSave?: () => void;
}) => {
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

	const handleEdit = (index: number) => {
		setEditIndex(index);
		setEditModalOpen(true);
	};

	return assignments.length > 0 ? (
		<>
			<ul>
				{assignments.map((ass, i) => (
					<Card
						key={i}
						className='my-3 bg-light-warning'>
						<CardBody>
							<li>
								<b>{ass.title}</b>
								<p>{ass.description}</p>
								{ass.attachmentUrl && (
									<a
										href={`${backendURL}/uploads/${ass.attachmentUrl}`}
										target='_blank'
										rel='noopener noreferrer'>
										View Attachment
									</a>
								)}
								<div className='mt-2'>
									<Button
										size='sm'
										color='info'
										onClick={() => handleEdit(i)}>
										Edit
									</Button>
								</div>
							</li>
						</CardBody>
					</Card>
				))}
			</ul>

			{editIndex !== null && (
				<EditAssignmentModal
					isOpen={editModalOpen}
					toggle={() => setEditModalOpen(false)}
					assignment={assignments[editIndex]}
					lessonId={lessonId}
					onSave={() => {
						setEditModalOpen(false);
						onSave?.();
					}}
				/>
			)}
		</>
	) : (
		<p className='text-muted'>No assignments available</p>
	);
};

export default AssignmentSection;

import { Button } from "reactstrap";
import { Assignment } from "@/Types/Lesson.type";

const AssignmentSection = ({
	assignments,
	lessonId,
}: {
	assignments: Assignment[];
	lessonId: string;
}) => {
	const handleDelete = (index: number) => {
		console.log("Delete assignment", index);
	};

	return assignments.length > 0 ? (
		<ul>
			{assignments.map((ass, i) => (
				<li key={i}>
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
			))}
		</ul>
	) : (
		<p className="text-muted">No assignments available</p>
	);
};

export default AssignmentSection;

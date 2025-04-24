"use client";

import { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Spinner,
	Badge,
} from "reactstrap";
import { toast } from "react-toastify";
import { assignStudentsToBatch } from "@/app/api/admin/batches";
import {
	getStudentsByCourseID,
	getStudentBatches,
} from "@/app/api/admin/students";
import { StudentProps } from "@/Types/Student.type";

interface AssignStudentsModalProps {
	batchId: string;
	isOpen: boolean;
	toggle: () => void;
	fetchData: () => void;
	batchCourseId: string;
	currentStudents: { _id: string; name: string; email: string }[];
}

const AssignStudentsModal = ({
	batchId,
	isOpen,
	toggle,
	fetchData,
	batchCourseId,
	currentStudents,
}: AssignStudentsModalProps) => {
	const [eligibleStudents, setEligibleStudents] = useState<any[]>([]);
	const [assignedInOtherBatches, setAssignedInOtherBatches] = useState<
		string[]
	>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [studentsBatches, setStudentsBatches] = useState<any[]>([]);
	useEffect(() => {
		const fetchAndPrepareStudents = async () => {
			try {
				setIsLoading(true);

				const studentsResponse = await getStudentsByCourseID(batchCourseId);
				const students = studentsResponse.students || [];

				const enrolledInCourse = students.filter((student: any) =>
					student.enrolledCourses?.some(
						(course: any) => course.course === batchCourseId
					)
				);

				const conflictingIds: string[] = [];

				await Promise.all(
					enrolledInCourse.map(async (student: StudentProps) => {
						try {
							const { batches } = await getStudentBatches(student._id);

							const isAssignedElsewhere = batches.some(
								(batch: any) =>
									batch.courseId === batchCourseId && batch.batchId !== batchId
							);

							if (isAssignedElsewhere) {
								conflictingIds.push(student._id);
							}
						} catch (err) {
							console.error(
								`Error fetching batches for student ${student._id}`,
								err
							);
						}
					})
				);

				setEligibleStudents(enrolledInCourse);
				setAssignedInOtherBatches(conflictingIds);

				const preSelected = enrolledInCourse
					.filter((s: any) => currentStudents.some((cs) => cs._id === s._id))
					.map((s: any) => s._id);

				setSelectedIds(preSelected);
			} catch (err) {
				toast.error("Failed to fetch student or batch data");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		if (isOpen && batchId && batchCourseId) {
			fetchAndPrepareStudents();
		}
	}, [isOpen, batchId, batchCourseId, currentStudents]);
	useEffect(() => {
		const fetchStudentsBatches = async () => {
			try {
			} catch (error) {}
		};
	}, []);
	const toggleStudentSelection = (studentId: string) => {
		if (assignedInOtherBatches.includes(studentId)) return;
		setSelectedIds((prev) =>
			prev.includes(studentId)
				? prev.filter((id) => id !== studentId)
				: [...prev, studentId]
		);
	};

	const selectAll = () => {
		const allowed = eligibleStudents
			.filter((s) => !assignedInOtherBatches.includes(s._id))
			.map((s) => s._id);
		setSelectedIds(allowed);
	};

	const deselectAll = () => {
		setSelectedIds([]);
	};

	const handleAssign = async () => {
		if (!selectedIds.length) {
			toast.error("Please select at least one student");
			return;
		}
		try {
			await assignStudentsToBatch({
				batchId,
				studentIds: selectedIds,
			});
			toast.success("Students assigned successfully!");
			toggle();
			fetchData();
		} catch (err) {
			console.error(err);
			toast.error("Failed to assign students");
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}>
			<ModalHeader toggle={toggle}>Assign Students</ModalHeader>
			<ModalBody>
				{isLoading ? (
					<div className='text-center my-3'>
						<Spinner /> Loading students...
					</div>
				) : eligibleStudents.length === 0 ? (
					<p className='text-muted'>No eligible students for this course.</p>
				) : (
					<>
						<div className='d-flex justify-content-end mb-2'>
							<Button
								color='primary'
								size='sm'
								className='me-2'
								onClick={selectAll}>
								Select All
							</Button>
							<Button
								color='outline-primary'
								size='sm'
								onClick={deselectAll}>
								Deselect All
							</Button>
						</div>
						<div className='d-flex flex-column gap-2'>
							{eligibleStudents.map((student) => {
								const isSelected = selectedIds.includes(student._id);
								const isInAnotherBatch = assignedInOtherBatches.includes(
									student._id
								);
								return (
									<div
										key={student._id}
										onClick={() => toggleStudentSelection(student._id)}
										className={`border rounded p-2 w-full d-flex justify-between align-items-center ${
											isInAnotherBatch
												? "bg-light text-muted"
												: isSelected
												? "bg-primary text-white"
												: "bg-white text-dark"
										}`}
										style={{
											cursor: isInAnotherBatch ? "not-allowed" : "pointer",
										}}>
										<div>
											<strong>{student.name}</strong>
											<br />
											<small>{student.email}</small>
										</div>
										<div>
											{isInAnotherBatch ? (
												<Badge color='danger'>Already assigned a batch</Badge>
											) : isSelected ? (
												<Badge
													color='light'
													className='text-primary'>
													Selected
												</Badge>
											) : (
												<Badge color='primary'>Click to Select</Badge>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</>
				)}
			</ModalBody>
			<ModalFooter>
				<Button
					color='primary'
					onClick={handleAssign}
					disabled={isLoading}>
					Assign
				</Button>
				<Button
					color='outline-primary'
					onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AssignStudentsModal;

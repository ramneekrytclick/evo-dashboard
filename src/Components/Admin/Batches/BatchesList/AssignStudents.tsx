"use client";

import { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	FormGroup,
	Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import { assignStudentsToBatch } from "@/app/api/admin/batches";
import { getStudentsByCourseID } from "@/app/api/admin/students";

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
	const [allStudents, setAllStudents] = useState<any[]>([]);
	const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchAndFilter = async () => {
			try {
				setIsLoading(true);
				const response = await getStudentsByCourseID(batchCourseId);
				const students = response.students || [];

				// Filter eligible students
				const eligible = students.filter((student: any) =>
					student.enrolledCourses?.some(
						(course: any) => course.course === batchCourseId
					)
				);

				setAllStudents(students);
				setFilteredStudents(eligible);

				// Preselect those already in batch
				const preSelected = eligible
					.filter((s: any) => currentStudents.some((cs) => cs._id === s._id))
					.map((s: any) => s._id);
				setSelectedIds(preSelected);
			} catch (err) {
				toast.error("Failed to fetch students");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		if (isOpen && batchId && batchCourseId) {
			fetchAndFilter();
		}
	}, [isOpen, batchId, batchCourseId, currentStudents]);
	const toggleStudentSelection = (studentId: string) => {
		setSelectedIds((prev) =>
			prev.includes(studentId)
				? prev.filter((id) => id !== studentId)
				: [...prev, studentId]
		);
	};

	const selectAll = () => {
		const allIds = filteredStudents.map((s) => s._id);
		setSelectedIds(allIds);
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
				) : filteredStudents.length === 0 ? (
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
						<div className='student-list d-flex flex-column align-items-center gap-2 w-full'>
							{filteredStudents.map((student) => {
								const isSelected = selectedIds.includes(student._id);
								return (
									<div
										key={student._id}
										onClick={() => toggleStudentSelection(student._id)}
										className={`border rounded p-2 w-full d-flex justify-content-between align-items-center cursor-pointer ${
											isSelected
												? "bg-primary text-white"
												: "bg-light text-dark"
										}`}
										style={{ transition: "all 0.2s ease", cursor: "pointer" }}>
										<div>
											<strong>{student.name}</strong> <br />
											<small>{student.email}</small>
										</div>
										<div>
											{isSelected ? (
												<span className='badge bg-white text-primary'>
													Selected
												</span>
											) : (
												<span className='badge bg-primary'>
													Click to Select
												</span>
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

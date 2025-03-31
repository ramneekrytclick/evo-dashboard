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
	Label,
	Input,
} from "reactstrap";
import { toast } from "react-toastify";
import { assignStudentsToBatch } from "@/app/api/admin/batches";
import { getStudents } from "@/app/api/admin/students";

interface AssignStudentsModalProps {
	batchId: string;
	isOpen: boolean;
	toggle: () => void;
	fetchData: () => void;
	batchCourseId: string;
}

const AssignStudentsModal = ({
	batchId,
	isOpen,
	toggle,
	fetchData,
	batchCourseId,
}: AssignStudentsModalProps) => {
	const [allStudents, setAllStudents] = useState<any[]>([]);
	const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchStudents = async () => {
		try {
			setIsLoading(true);
			const response = await getStudents();
			console.log(response);

			setAllStudents(response);
		} catch (err) {
			toast.error("Failed to fetch students");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (batchId) {
			fetchStudents();
		}
	}, [batchId]);

	useEffect(() => {
		if (batchCourseId && allStudents) {
			console.log(batchCourseId);

			const eligible = allStudents.filter((student) =>
				student.enrolledCourses?.some(
					(course: any) => course.course === batchCourseId
				)
			);
			setFilteredStudents(eligible);
		}
	}, [batchCourseId, allStudents]);

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
		if (!selectedIds.length)
			return toast.error("Please select at least one student");

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
			toggle={toggle}
			size="lg">
			<ModalHeader toggle={toggle}>Assign Students</ModalHeader>
			<ModalBody>
				{isLoading ? (
					<div className="text-center my-3">
						<Spinner /> Loading students...
					</div>
				) : filteredStudents.length === 0 ? (
					<p className="text-muted">No eligible students for this course.</p>
				) : (
					<FormGroup>
						<div className="d-flex justify-content-end mb-2">
							<Button
								color="secondary"
								size="sm"
								onClick={selectAll}
								className="me-2">
								Select All
							</Button>
							<Button
								color="outline-secondary"
								size="sm"
								onClick={deselectAll}>
								Deselect All
							</Button>
						</div>
						{filteredStudents.map((student) => (
							<FormGroup
								key={student._id}
								check>
								<Label check>
									<Input
										type="checkbox"
										checked={selectedIds.includes(student._id)}
										onChange={() => toggleStudentSelection(student._id)}
									/>
									{student.name} ({student.email})
								</Label>
							</FormGroup>
						))}
					</FormGroup>
				)}
			</ModalBody>
			<ModalFooter>
				<Button
					color="primary"
					onClick={handleAssign}
					disabled={isLoading}>
					Assign
				</Button>
				<Button
					color="secondary"
					onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AssignStudentsModal;

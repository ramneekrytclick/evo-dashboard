"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable, { TableColumn } from "react-data-table-component";
import {
	Button,
	Card,
	CardBody,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	Input,
	Spinner,
} from "reactstrap";

import { getCourses } from "@/app/api/admin/course";
import { getStudents } from "@/app/api/admin/students";
import {
	generateCertificate,
	getSubmittedAssignments,
} from "@/app/api/admin/certificate";

// ---------- TYPES ----------
interface Course {
	_id: string;
	title: string;
}

interface Lesson {
	_id: string;
	course: string;
}

interface Assignment {
	_id: string;
	lesson: Lesson;
	student: { _id: string };
}

interface EnrolledCourse {
	course: string;
	completedLessons?: string[];
	assignmentScore?: number;
	quizScore?: number; // This should ideally be a count of completed quizzes
	evoScore?: number;
}

interface Student {
	_id: string;
	name: string;
	enrolledCourses: EnrolledCourse[];
}

interface TableRow {
	studentId: string;
	studentName: string;
	courseId: string;
	course: string;
	assignmentsDone: number;
	totalAssignments: number;
	quizzesDone: number;
	totalQuizzes: number;
	progress: number;
	evoScore: number;
}

// ---------- COMPONENT ----------
const CertificateTable = () => {
	const [allStudents, setAllStudents] = useState<Student[]>([]);
	const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
	const [courses, setCourses] = useState<Course[]>([]);
	const [tableData, setTableData] = useState<TableRow[]>([]);

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<TableRow | null>(null);
	const [certificateFile, setCertificateFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const toggleModal = () => {
		setModalOpen(!modalOpen);
		if (modalOpen) {
			// Reset state when closing
			setSelectedStudent(null);
			setCertificateFile(null);
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
	};

	const fetchData = async () => {
		try {
			const [students, { submissions: assignments }, courseList] =
				await Promise.all([
					getStudents(),
					getSubmittedAssignments(),
					getCourses(),
				]);
			setAllStudents(students.reverse());
			setAllAssignments(assignments);
			setCourses(courseList);
		} catch (error) {
			console.error(error);
			toast.error("Error loading data.");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (allStudents.length && allAssignments.length && courses.length) {
			const assignmentCountMap: Record<string, number> = {};
			allAssignments.forEach((a) => {
				const courseId = a.lesson?.course;
				if (courseId)
					assignmentCountMap[courseId] =
						(assignmentCountMap[courseId] || 0) + 1;
			});

			const rows: TableRow[] = [];

			allStudents.forEach((student) => {
				const studentAssignmentMap: Record<string, number> = {};
				allAssignments.forEach((a) => {
					const courseId = a.lesson?.course;
					if (a.student?._id === student._id && courseId) {
						studentAssignmentMap[courseId] =
							(studentAssignmentMap[courseId] || 0) + 1;
					}
				});

				student.enrolledCourses?.forEach((enroll) => {
					const courseId = enroll.course;
					const course = courses.find((c) => c._id === courseId);
					if (!course) return;

					const totalAssignments = assignmentCountMap[courseId] || 0;
					const submittedAssignments = studentAssignmentMap[courseId] || 0;
					const progress = totalAssignments
						? Math.round((submittedAssignments / totalAssignments) * 100)
						: 0;

					rows.push({
						studentId: student._id,
						studentName: student.name,
						courseId,
						course: course.title,
						assignmentsDone: submittedAssignments,
						totalAssignments,
						quizzesDone: enroll.quizScore || 0,
						totalQuizzes: 1,
						progress,
						evoScore: enroll.evoScore || 0,
					});
				});
			});

			setTableData(rows.sort((a, b) => b.progress - a.progress));
		}
	}, [allStudents, allAssignments, courses]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setCertificateFile(file);

		if (previewUrl) URL.revokeObjectURL(previewUrl); // Clear old URL

		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const handleIssueCertificate = async () => {
		if (!selectedStudent || !certificateFile) {
			toast.error("Please upload a certificate file.");
			return;
		}
		try {
			setIsLoading(true);
			const formData = new FormData();
			formData.append("studentId", selectedStudent.studentId);
			formData.append("courseId", selectedStudent.courseId);
			formData.append("certificate", certificateFile);

			await generateCertificate(formData);
			toast.success("Certificate issued successfully.");
			toggleModal();
		} catch (error) {
			console.error(error);
			toast.error("Failed to issue certificate.");
		} finally {
			setIsLoading(false);
		}
	};

	const columns: TableColumn<TableRow>[] = [
		{
			name: "Student Name",
			selector: (row) => row.studentName,
			sortable: true,
		},
		{ name: "Course", selector: (row) => row.course, sortable: true },
		{
			name: "Assignments",
			selector: (row) => `${row.assignmentsDone}/${row.totalAssignments}`,
			sortable: true,
		},
		{
			name: "Quizzes",
			selector: (row) => `${row.quizzesDone}/${row.totalQuizzes}`,
			sortable: true,
		},
		{
			name: "Progress",
			selector: (row) => `${row.progress}%`,
			sortable: true,
		},
		{ name: "Evo Score", selector: (row) => row.evoScore, sortable: true },
		{
			name: "Action",
			cell: (row) => (
				<Button
					color="info"
					onClick={() => {
						setSelectedStudent(row);
						toggleModal();
					}}>
					Issue
				</Button>
			),
		},
	];

	return (
		<>
			<p>{JSON.stringify(allAssignments)}</p>
			<p>{JSON.stringify(courses)}</p>
			<p>{JSON.stringify(allStudents)}</p>
			<Card>
				<CardBody>
					<DataTable
						columns={columns}
						data={tableData}
						pagination
						striped
						highlightOnHover
						persistTableHead
					/>
				</CardBody>
			</Card>

			{/* Modal */}
			<Modal
				isOpen={modalOpen}
				toggle={toggleModal}>
				<ModalHeader toggle={toggleModal}>
					Generate Certificate for {selectedStudent?.studentName}
				</ModalHeader>
				<ModalBody>
					<Label>Upload Certificate (PDF or Image)</Label>
					<Input
						type="file"
						accept="application/pdf,image/*"
						onChange={handleFileChange}
					/>
					{!certificateFile && (
						<small className="text-danger">
							* Certificate file is required
						</small>
					)}

					{previewUrl && (
						<div className="mt-3">
							<Label>Preview:</Label>
							{certificateFile?.type === "application/pdf" ? (
								<iframe
									src={previewUrl}
									width="100%"
									height="400px"
									title="PDF Preview"
								/>
							) : (
								<img
									src={previewUrl}
									alt="Certificate Preview"
									style={{ maxWidth: "100%", maxHeight: "400px" }}
								/>
							)}
						</div>
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						onClick={handleIssueCertificate}
						disabled={!certificateFile || isLoading}>
						{isLoading ? <Spinner size="sm" /> : "Give Certificate"}
					</Button>
					<Button
						color="secondary"
						onClick={toggleModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default CertificateTable;

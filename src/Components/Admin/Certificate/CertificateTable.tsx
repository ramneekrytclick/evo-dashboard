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

interface Course {
	_id: string;
	title: string;
}

interface Assignment {
	_id: string;
	lesson: { _id: string; course: string };
	student: { _id: string };
}

interface EnrolledCourse {
	course: string;
	assignmentScore?: number;
	quizScore?: number;
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

const CertificateTable = () => {
	const [students, setStudents] = useState<Student[]>([]);
	const [assignments, setAssignments] = useState<Assignment[]>([]);
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
			setSelectedStudent(null);
			setCertificateFile(null);
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
	};

	const fetchData = async () => {
		try {
			const [studentList, assignmentList, courseList] = await Promise.all([
				getStudents(),
				getSubmittedAssignments(),
				getCourses(),
			]);
			setStudents(studentList);
			setAssignments(assignmentList.submissions);
			setCourses(courseList);
		} catch (error: any) {
			toast.error("Failed to fetch data");
			console.error("Failed to fetch data", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (!students.length || !assignments.length || !courses.length) return;

		const assignmentMap: Record<string, number> = {};
		assignments.forEach((a) => {
			if (a.lesson?.course) {
				assignmentMap[a.lesson.course] =
					(assignmentMap[a.lesson.course] || 0) + 1;
			}
		});

		const table: TableRow[] = [];

		students.forEach((student) => {
			const submissionMap: Record<string, number> = {};
			assignments.forEach((a) => {
				if (a.student._id === student._id && a.lesson?.course) {
					submissionMap[a.lesson.course] =
						(submissionMap[a.lesson.course] || 0) + 1;
				}
			});

			student.enrolledCourses.forEach((enrolled) => {
				const course = courses.find((c) => c._id === enrolled.course);
				if (!course) return;

				const totalAssignments = assignmentMap[enrolled.course] || 0;
				const assignmentsDone = submissionMap[enrolled.course] || 0;
				const progress = totalAssignments
					? Math.round((assignmentsDone / totalAssignments) * 100)
					: 0;

				table.push({
					studentId: student._id,
					studentName: student.name,
					courseId: course._id,
					course: course.title,
					assignmentsDone,
					totalAssignments,
					quizzesDone: enrolled.quizScore || 0,
					totalQuizzes: 1,
					progress,
					evoScore: enrolled.evoScore || 0,
				});
			});
		});

		setTableData(table.sort((a, b) => b.progress - a.progress));
	}, [students, assignments, courses]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setCertificateFile(file);
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		if (file) setPreviewUrl(URL.createObjectURL(file));
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
			toggleModal();
			toast.success("Certificate issued successfully!");
		} catch (err) {
			toast.error("Certificate issue failed");
		} finally {
			setIsLoading(false);
		}
	};

	const columns: TableColumn<TableRow>[] = [
		{ name: "Student", selector: (row) => row.studentName, sortable: true },
		{ name: "Course", selector: (row) => row.course, sortable: true },
		{
			name: "Assignments",
			selector: (row) => `${row.assignmentsDone}/${row.totalAssignments}`,
		},
		{
			name: "Quizzes",
			selector: (row) => `${row.quizzesDone}/${row.totalQuizzes}`,
		},
		{ name: "Progress", selector: (row) => `${row.progress}%` },
		{ name: "Evo Score", selector: (row) => row.evoScore },
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

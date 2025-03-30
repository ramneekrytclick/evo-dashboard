"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable, { TableColumn } from "react-data-table-component";

import { getCourses } from "@/app/api/admin/course";
import { getStudents } from "@/app/api/admin/students";
import { getSubmittedAssignments } from "@/app/api/mentor";
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
} from "reactstrap";

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
	quizScore?: number;
	evoScore?: number;
}

interface Student {
	_id: string;
	name: string;
	enrolledCourses: EnrolledCourse[];
}

interface TableRow {
	studentName: string;
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

	const toggleModal = () => {
		setModalOpen(!modalOpen);
		setCertificateFile(null);
		setPreviewUrl(null);
	};

	const fetchAllCourses = async () => {
		try {
			const response: Course[] = await getCourses();
			setCourses(response);
		} catch (error) {
			toast.error("Error fetching courses");
		}
	};

	const fetchAllAssignments = async () => {
		try {
			const response: Assignment[] = await getSubmittedAssignments();
			setAllAssignments(response);
		} catch (error) {
			toast.error("Error fetching assignments");
		}
	};

	const fetchAllStudents = async () => {
		try {
			const response: Student[] = await getStudents();
			setAllStudents(response.reverse());
		} catch (error) {
			toast.error("Error fetching students");
		}
	};

	const getAssignmentCountPerCourse = (assignments: Assignment[]) => {
		const countMap: Record<string, number> = {};
		assignments.forEach((a) => {
			const courseId = a.lesson?.course;
			if (courseId) {
				countMap[courseId] = (countMap[courseId] || 0) + 1;
			}
		});
		return countMap;
	};

	const getStudentAssignmentSubmissions = (
		assignments: Assignment[],
		studentId: string
	) => {
		const map: Record<string, number> = {};
		assignments.forEach((a) => {
			const courseId = a.lesson?.course;
			if (a.student?._id === studentId && courseId) {
				map[courseId] = (map[courseId] || 0) + 1;
			}
		});
		return map;
	};

	const generateTableData = () => {
		const assignmentCountMap = getAssignmentCountPerCourse(allAssignments);
		const allData: TableRow[] = [];

		allStudents.forEach((student) => {
			const studentAssignments = getStudentAssignmentSubmissions(
				allAssignments,
				student._id
			);
			const enrolledCourses = student.enrolledCourses || [];

			enrolledCourses.forEach((courseObj) => {
				const courseId = courseObj.course;
				const course = courses.find((c) => c._id === courseId);
				const courseTitle = course?.title || "Unknown";

				const totalAssignments = assignmentCountMap[courseId] || 0;
				const submittedAssignments = studentAssignments[courseId] || 0;

				const progress = totalAssignments
					? Math.round((submittedAssignments / totalAssignments) * 100)
					: 0;

				allData.push({
					studentName: student.name,
					course: courseTitle,
					assignmentsDone: submittedAssignments,
					totalAssignments,
					quizzesDone: courseObj.quizScore || 0,
					totalQuizzes: 1, // Update if you have more quiz info
					progress,
					evoScore: courseObj.evoScore || 0,
				});
			});
		});

		allData.sort((a, b) => b.progress - a.progress); // Sort descending by progress
		setTableData(allData);
	};

	useEffect(() => {
		const loadData = async () => {
			await fetchAllStudents();
			await fetchAllAssignments();
			await fetchAllCourses();
		};

		loadData();
	}, []);

	useEffect(() => {
		if (allStudents.length && allAssignments.length && courses.length) {
			generateTableData();
		}
	}, [allStudents, allAssignments, courses]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setCertificateFile(file);
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		} else {
			setPreviewUrl(null);
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
			name: "Assignments Done",
			selector: (row) => row.assignmentsDone + " / " + row.totalAssignments,
			sortable: true,
		},
		{
			name: "Quizzes Done",
			selector: (row) => row.quizzesDone + " / " + row.totalQuizzes,
			sortable: true,
		},
		{
			name: "Progress %",
			selector: (row) => `${row.progress}%`,
			sortable: true,
		},
		{ name: "Evo Score", selector: (row) => row.evoScore },
		{
			name: "Action",
			cell: (row) => (
				<Button
					color="info"
					// disabled={row.progress < 99}
					onClick={() => {
						setSelectedStudent(row);
						toggleModal();
					}}>
					Certify
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
					<Button color="primary">
						{/* Submit button left intentionally blank */}
						Give Certificate
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

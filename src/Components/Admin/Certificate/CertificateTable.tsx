"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable, { TableColumn } from "react-data-table-component";

import { getCourses } from "@/app/api/admin/course";
import { getStudents } from "@/app/api/admin/students";
import { getSubmittedAssignments } from "@/app/api/mentor";
import { Card, CardBody } from "reactstrap";

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

	const columns: TableColumn<TableRow>[] = [
		{
			name: "Student Name",
			selector: (row) => row.studentName,
			sortable: true,
		},
		{ name: "Course", selector: (row) => row.course, sortable: true },
		{ name: "Assignments Done", selector: (row) => row.assignmentsDone },
		{ name: "Total Assignments", selector: (row) => row.totalAssignments },
		{ name: "Quizzes Done", selector: (row) => row.quizzesDone },
		{ name: "Total Quizzes", selector: (row) => row.totalQuizzes },
		{
			name: "Progress %",
			selector: (row) => `${row.progress}%`,
			sortable: true,
		},
		{ name: "Evo Score", selector: (row) => row.evoScore },
	];

	return (
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
	);
};

export default CertificateTable;

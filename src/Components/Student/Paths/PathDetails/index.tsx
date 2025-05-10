"use client";

import { getEnrolledCourses, getPathById } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PathRoadmap from "./PathRoadmap";
import { Card, Spinner } from "reactstrap";
import { useAuth } from "@/app/AuthProvider";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { PathProps } from "../PathCards";

export interface Path {
	name: string;
	description: string;
	timing: string;
	price: number;
	courses: { id: string; title: string; description: string; slug: string }[];
	wannaBeInterest: string[];
}
const PathDetails = ({ id }: { id: string }) => {
	const [data, setData] = useState<Path>();
	const [enrolledCourses, setEnrolledCourses] = useState([]);
	const { user } = useAuth();
	const role = user?.role;
	const fetchData = async () => {
		try {
			const response = await getPathById(id);
			setData(response.path);
		} catch (error) {
			toast.error("Error fetching your path details.");
		}
	};
	const fetchEnrolledCourses = async () => {
		try {
			const response = await getEnrolledCourses();
			setEnrolledCourses(response.enrolledCourses);
		} catch (error) {
			toast.error("Error fetching your enrolled courses.");
		}
	};
	useEffect(() => {
		fetchData();
		if (role === "Student") {
			fetchEnrolledCourses();
		}
	}, []);
	return (
		<>
			<Breadcrumbs
				mainTitle={data?.name || "Path Details"}
				parent='Student'
				title='Path Details'
			/>
			{data ? (
				<Card style={{ height: "75vh", overflow: "auto" }}>
					<PathRoadmap
						role={role || "Student"}
						path={data}
						enrolledCourses={enrolledCourses}
					/>
				</Card>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default PathDetails;

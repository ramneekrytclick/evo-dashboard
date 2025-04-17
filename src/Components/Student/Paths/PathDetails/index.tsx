"use client";

import { getEnrolledCourses, getPathById } from "@/app/api/student";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PathRoadmap from "./PathRoadmap";
import { Spinner } from "reactstrap";
import { useAuth } from "@/app/AuthProvider";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { PathProps } from "../PathCards";

export interface Path {
	title: string;
	description: string;
	timing: string;
	price: number;
	courses: { _id: string; title: string }[];
	wannaBeInterest: { _id: string; title: string }[];
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
				mainTitle={data?.title || "Path Details"}
				parent='Student'
				title='Path Details'
			/>
			{data ? (
				<PathRoadmap
					role={role || "Student"}
					path={data}
					enrolledCourses={enrolledCourses}
				/>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default PathDetails;

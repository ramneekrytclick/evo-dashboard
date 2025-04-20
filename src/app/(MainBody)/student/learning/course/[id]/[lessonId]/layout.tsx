import { getAllCourses } from "@/app/api/cc";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import SidebarToggleClient from "@/CommonComponent/SidebarToggleClient";
import LessonSidebar from "@/Components/Student/Course/Lesson/LessonSidebar";
import { notFound } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Container, Col, Row, Card, CardBody } from "reactstrap";

const Layout = async ({
	children,
	params,
}: {
	children: ReactNode;
	params: { id: string; lessonId: string };
}) => {
	const response = await getAllCourses();
	const course = response.courses.find((c: any) => c._id === params.id);

	if (!course) {
		console.log("Not Found");
		return notFound();
	}

	return (
		<>
			<SidebarToggleClient />
			{children}
		</>
	);
};

export default Layout;

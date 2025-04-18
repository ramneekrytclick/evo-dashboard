import { getAllCourses } from "@/app/api/cc";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import SidebarToggleClient from "@/CommonComponent/SidebarToggleClient";
import LessonSidebar from "@/Components/Admin/Course/Lesson/LessonSidebar";
import { setToggleSidebar } from "@/Redux/Reducers/Layout/LayoutSlice";
import { notFound } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Col, Row, Card, CardBody } from "reactstrap";

const Layout = async ({
	children,
	params,
}: {
	children: ReactNode;
	params: { id: string; lessonId: string };
}) => {
	const response = await getAllCourses();
	const course = response.courses.find((c: any) => c.id === params.id);

	if (!course) return notFound();

	return (
		<Container fluid>
			<Breadcrumbs
				parent='Courses'
				title={course.title}
				mainTitle={course.title}
			/>
			<SidebarToggleClient />
			<Card
				className='p-2 bg-light-subtle'
				style={{ minHeight: "80vh" }}>
				<Row className='h-100'>
					<Col
						sm={12}
						lg={9}>
						<Card className='shadow-sm h-100'>
							<CardBody>{children}</CardBody>
						</Card>
					</Col>
					<Col
						sm={12}
						lg={3}>
						<LessonSidebar
							courseId={params.id}
							lessonId={params.lessonId}
						/>
					</Col>
				</Row>
			</Card>
		</Container>
	);
};

export default Layout;

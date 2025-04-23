import CoursesPageContainer from "@/Components/Admin/Courses";
// /admin/courses/page.tsx
export function generateMetadata() {
	return {
		title: "Manage Courses",
		description: "Browse, edit, and manage all courses on EVO.",
	};
}
const CoursesPage = () => {
	return <CoursesPageContainer />;
};

export default CoursesPage;

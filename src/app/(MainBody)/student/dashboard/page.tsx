import StudentDashboardContainer from "@/Components/Student/Dashboard";
import { generateSEOMetadata } from "@/utils/seo";
import { Metadata } from "next";

export const generateMetadata = (): Metadata =>
	generateSEOMetadata({
		title: "Student Dashboard",
		description:
			"Access your personalized learning dashboard, track progress, and manage enrolled courses.",
		pathname: "/student/dashboard",
		keywords: [
			"student",
			"dashboard",
			"evo",
			"courses",
			"learning platform",
			"progress tracker",
		],
	});

const Page = () => {
	return <StudentDashboardContainer />;
};

export default Page;

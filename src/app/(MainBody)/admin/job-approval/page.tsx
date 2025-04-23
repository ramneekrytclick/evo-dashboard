import JobApprovalContainer from "@/Components/Admin/JobApproval";
export function generateMetadata() {
	return {
		title: "Job Approval",
		description: "Review and approve job listings from employers.",
	};
}
const page = () => {
	return <JobApprovalContainer />;
};

export default page;

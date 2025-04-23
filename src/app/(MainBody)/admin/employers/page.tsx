import EmployerPageContainer from "@/Components/Admin/Employer";
// /admin/employers/page.tsx
export function generateMetadata() {
	return {
		title: "Manage Employers",
		description: "View and manage employer accounts and job postings.",
	};
}
const EmployerPage = () => {
	return <EmployerPageContainer />;
};

export default EmployerPage;

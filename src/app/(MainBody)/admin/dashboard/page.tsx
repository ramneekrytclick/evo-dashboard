import AdminDashboardContainer from "@/Components/Admin/AdminDashboard";

export const generateMetadata = () => ({
	title: "Admin Dashboard",
	description: "Manage courses, users, jobs, and overall platform insights.",
});
const AdminDashboard = () => {
	return <AdminDashboardContainer />;
};

export default AdminDashboard;

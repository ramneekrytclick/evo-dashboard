import ProfilePage from "@/Components/Profile";
export function generateMetadata() {
	return {
		title: "Profile",
		description: "Manage your account settings and profile information.",
	};
}
const page = () => {
	return <ProfilePage />;
};

export default page;

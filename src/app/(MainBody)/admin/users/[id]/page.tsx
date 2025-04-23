import UserProfile from "@/Components/Admin/UserProfile";
export function generateMetadata() {
	return {
		title: "User Profile",
		description: "View details and manage user account.",
	};
}
const UserProfilePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	return <UserProfile id={(await params).id} />;
};

export default UserProfilePage;

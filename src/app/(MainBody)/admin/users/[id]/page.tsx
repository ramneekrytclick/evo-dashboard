import UserProfile from "@/Components/Admin/UserProfile";

const UserProfilePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	return <UserProfile id={(await params).id} />;
};

export default UserProfilePage;

import AnnouncementsContainer from "@/Components/Admin/Announcements";

export function generateMetadata() {
	return {
		title: "Announcements",
		description: "Publish platform-wide updates and alerts.",
	};
}
const AnnouncementsPage = () => {
	return <AnnouncementsContainer />;
};

export default AnnouncementsPage;

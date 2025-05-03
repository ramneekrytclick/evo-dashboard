import AnnouncementsContainer from "@/Components/Admin/Announcements";
import { generateSEOMetadata } from "@/utils/seo";

export const metadata = generateSEOMetadata({
	title: "Admin Announcements",
	description:
		"Manage and review all announcements for different user roles in the admin panel.",
	pathname: "/admin/announcements",
	keywords: ["admin", "announcements", "user roles", "dashboard"],
});

const AnnouncementsPage = () => {
	return <AnnouncementsContainer />;
};

export default AnnouncementsPage;

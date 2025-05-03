import BatchesPageContainer from "@/Components/Admin/Batches";
import { generateSEOMetadata } from "@/utils/seo";

export const metadata = generateSEOMetadata({
	title: "Batches",
	description:
		"Manage and review all batches for different courses and their students and mentor in the admin panel.",
	pathname: "/admin/batches",
	keywords: ["admin", "batches", "courses", "evo", "learning", "dashboard"],
});
const BatchesPage = () => {
	return <BatchesPageContainer />;
};

export default BatchesPage;

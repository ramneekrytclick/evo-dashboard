import BatchDetailsSlug from "@/Components/Admin/Batches/BatchDetails";
import CourseBatchContainer from "@/Components/Admin/Batches/CourseBatches";
export function generateMetadata() {
	return {
		title: "Batch Details - Admin EVO",
		description: "Group students and assign mentors to course batches.",
	};
}
const LessonPage = async ({ params }: { params: { slug: string } }) => {
	return <BatchDetailsSlug id={params.slug} />;
};

export default LessonPage;

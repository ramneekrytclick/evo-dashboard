import MentorBatchContainer from "@/Components/Mentor/Batches/Batch";

const BatchPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <MentorBatchContainer id={(await params).id} />;
};

export default BatchPage;

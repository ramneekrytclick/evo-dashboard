import MyBatchContainer from "@/Components/Student/Batches/MyBatch";

const BatchPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <MyBatchContainer id={(await params).id} />;
};

export default BatchPage;

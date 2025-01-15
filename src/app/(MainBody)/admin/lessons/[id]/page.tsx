
const LessonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <div>{(await params).id} </div>;
};

export default LessonPage;

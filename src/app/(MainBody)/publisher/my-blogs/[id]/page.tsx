import BlogPageContainer from "@/Components/Publisher/BlogPage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;
	return <BlogPageContainer slug={id} />;
};

export default page;

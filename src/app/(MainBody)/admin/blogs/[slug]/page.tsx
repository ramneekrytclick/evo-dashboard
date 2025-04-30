import BlogPage from "@/Components/Admin/Blogs/BlogPage";

const page = ({ params }: { params: { slug: string } }) => {
	return <BlogPage slug={params.slug} />;
};

export default page;

import BlogsPageContainer from "@/Components/Admin/Blogs";
export function generateMetadata() {
	return {
		title: "Blog Approval",
		description: "Moderate and publish submitted blog content.",
	};
}
const BlogApprovalPage = () => {
	return <BlogsPageContainer />;
};

export default BlogApprovalPage;

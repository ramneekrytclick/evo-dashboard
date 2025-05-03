import BlogsPageContainer from "@/Components/Admin/Blogs";
import { generateSEOMetadata } from "@/utils/seo";

export const metadata = generateSEOMetadata({
	title: "Blog Approval",
	description: "Approve Blogs",
	pathname: "/admin/batches",
	keywords: ["admin", "batches", "courses", "evo", "learning", "dashboard"],
});
const BlogApprovalPage = () => {
	return <BlogsPageContainer />;
};

export default BlogApprovalPage;

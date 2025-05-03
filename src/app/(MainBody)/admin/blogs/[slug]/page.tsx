import BlogPage from "@/Components/Admin/Blogs/BlogPage";
import { generateSEOMetadata } from "@/utils/seo";
import { getBlogBySlug } from "@/app/api/admin/blogs/blog";
import { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	try {
		const blog = await getBlogBySlug(params.slug);
		return generateSEOMetadata({
			title: blog.title + " | Blog Approval",
			description: blog.description || "Approve user-generated blogs",
			keywords: [
				"admin",
				"blogs",
				"approval",
				blog.title,
				...(blog.tags || []),
			],
			pathname: `/admin/blogs/${params.slug}`,
		});
	} catch (error) {
		return generateSEOMetadata({
			title: "Blog Not Found | Blog Approval",
			description: "The requested blog was not found.",
			pathname: `/admin/blogs/${params.slug}`,
		});
	}
}

const Page = ({ params }: { params: { slug: string } }) => {
	return <BlogPage slug={params.slug} />;
};

export default Page;

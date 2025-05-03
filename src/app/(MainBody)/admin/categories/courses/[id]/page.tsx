import CoursesUnderCategory from "@/Components/Admin/Categories/Courses/page";
import { generateSEOMetadata } from "@/utils/seo";
import { getCategoryBySlug } from "@/app/api/admin/categories";
import { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	try {
		const category = await getCategoryBySlug(params.id);
		return generateSEOMetadata({
			title: `${category.title} | Category Courses`,
			description:
				category.description ||
				"Explore and manage courses under this category",
			pathname: `/admin/categories/${params.id}`,
			keywords: [
				"admin",
				"categories",
				"courses",
				category.title,
				...(category?.title?.split(" ") || []),
			],
		});
	} catch (error) {
		return generateSEOMetadata({
			title: "Category Not Found | Category Courses",
			description: "This category could not be loaded",
			pathname: `/admin/categories/${params.id}`,
			keywords: ["admin", "categories", "not found", "evo"],
		});
	}
}

const Page = ({ params }: { params: { id: string } }) => {
	return <CoursesUnderCategory categoryId={params.id} />;
};

export default Page;

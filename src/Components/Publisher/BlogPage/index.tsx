import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import BlogPageContainer from "./Blog";

const index = ({ slug }: { slug: string }) => {
	return (
		<>
			<Breadcrumbs
				mainTitle='Blog Details'
				title='Blog Details'
				parent='Publisher'
			/>
			<BlogPageContainer id={slug} />
		</>
	);
};

export default index;

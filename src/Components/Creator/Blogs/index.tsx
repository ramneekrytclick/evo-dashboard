import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CreatorTitle, myBlogsTitle } from "@/Constant";
import { Col } from "reactstrap";
import MyBlogs from "./MyBlogs";

const MyBlogsContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={myBlogsTitle}
				parent={CreatorTitle}
				title={myBlogsTitle}
			/>
			<Col
				xxl={6}
				className="box-col-60 xl-60">
                    <MyBlogs />
                </Col>
		</>
	);
};

export default MyBlogsContainer;

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { CreatorTitle, myBlogsTitle } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import MyBlogs from "./MyBlogs";

const MyBlogsContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={myBlogsTitle}
				parent={CreatorTitle}
				title={myBlogsTitle}
			/>
			<Container fluid>
				<MyBlogs />
			</Container>
		</>
	);
};

export default MyBlogsContainer;

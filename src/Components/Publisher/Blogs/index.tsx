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
				<Row>
					<Col xs={12}>
						<Card>
							{/* <CommonCardHeader title={myBlogsTitle} /> */}
							<CardBody>
								<Row className="g-xl-5 g-3">
									<MyBlogs />
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default MyBlogsContainer;

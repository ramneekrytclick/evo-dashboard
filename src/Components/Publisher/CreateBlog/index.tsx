"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { createBlogTitle, CreatorTitle } from "@/Constant";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateBlogForm from "./CreateBlogForm";
import SidebarToggleClient from "@/CommonComponent/SidebarToggleClient";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToggleSidebar } from "@/Redux/Reducers/Layout/LayoutSlice";

const CreateBlogContainer = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setToggleSidebar(true));
		return () => {
			dispatch(setToggleSidebar(false));
		};
	}, [dispatch]);
	return (
		<>
			<Breadcrumbs
				mainTitle={createBlogTitle}
				parent={CreatorTitle}
				title={createBlogTitle}
			/>
			<Container fluid>
				<SidebarToggleClient />
				<Row>
					<Col xs={12}>
						<Card>
							<CardBody className='add-post'>
								<CreateBlogForm />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CreateBlogContainer;

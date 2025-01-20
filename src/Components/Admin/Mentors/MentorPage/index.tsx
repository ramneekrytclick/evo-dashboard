import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { AdminTitle, ImagePath, MentorTitle } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import { Card, Col, Container, Row } from "reactstrap";
import MentorProfile from "./MentorProfile";

const MentorContainer = ({ id }: { id: string }) => {
	return (
		<>
			<Breadcrumbs
				mainTitle={MentorTitle}
				parent={AdminTitle}
				title={MentorTitle}
			/>
			<Container fluid>
				<Row>
					<MentorProfile/>
				</Row>
			</Container>
		</>
	);
};

export default MentorContainer;

"use client";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";
import Link from "next/link";
import { BreadcrumbsProps } from "@/Types/CommonComponent.type";
import SVG from "../SVG";
import { useAuth } from "@/app/AuthProvider";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	mainTitle,
	parent,
	title,
}) => {
	const { user } = useAuth();
	const role = user?.role;
	return (
		<Container
			fluid
			className='pt-3 pb-3'>
			<div className='page-title'>
				<Row>
					<Col
						sm={6}
						className='p-0'>
						<h2 className='fw-bold'>{mainTitle}</h2>
					</Col>
					<Col
						sm={6}
						className='p-0'>
						<Breadcrumb>
							<BreadcrumbItem>
								<Link href={`/${role?.toLowerCase()}/dashboard`}>
									<SVG iconId='stroke-home' />
								</Link>
							</BreadcrumbItem>
							<BreadcrumbItem className='fs-6'>{parent}</BreadcrumbItem>
							<BreadcrumbItem
								className='fs-6'
								active>
								{title}
							</BreadcrumbItem>
						</Breadcrumb>
					</Col>
				</Row>
			</div>
		</Container>
	);
};
export default Breadcrumbs;

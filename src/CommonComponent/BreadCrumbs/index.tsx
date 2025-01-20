"use client"
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";
import Link from "next/link";
import { BreadcrumbsProps } from "@/Types/CommonComponent.type";
import SVG from "../SVG";
import { useAuth } from "@/app/AuthProvider";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ mainTitle, parent, title }) => {
  const {role}=useAuth();
  return (
    <Container fluid>
      <div className="page-title">
        <Row>
          <Col sm={6} className="p-0">
            <h3>{mainTitle}</h3>
          </Col>
          <Col sm={6} className="p-0">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href={`/${role?.toLowerCase()}/dashboard`}>
                  <SVG iconId="stroke-home"  />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>{parent}</BreadcrumbItem>
              <BreadcrumbItem active>{title}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default Breadcrumbs;
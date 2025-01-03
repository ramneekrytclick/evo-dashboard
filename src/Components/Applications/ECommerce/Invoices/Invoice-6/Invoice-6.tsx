"use client";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import InvoiceSixPrint from "./InvoiceSixPrint";
import InvoiceSixHeader from "./InvoiceSixHeader";
import UserDetails from "./UserDetails";
import InvoiceSixTable from "./InvoiceSixTable"; 
import { useRef } from "react";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Invoice, InvoiceSix } from "@/Constant";

const InvoiceSixContainer = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <Breadcrumbs mainTitle={InvoiceSix} parent={Invoice} title="" />
      <Container>
        <div ref={componentRef}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div className="invoice">
                    <div>
                      <InvoiceSixHeader />
                      <hr />
                      <UserDetails />
                      <InvoiceSixTable />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <InvoiceSixPrint componentRef={componentRef} />
      </Container>
    </>
  );
};

export default InvoiceSixContainer;

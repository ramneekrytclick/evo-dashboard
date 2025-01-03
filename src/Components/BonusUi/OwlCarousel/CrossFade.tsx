import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { CrossFades } from "@/Constant";
import { crossFadeData, crossFadeDataList } from "@/Data/BonusUi/OwlCarousel";

const CrossFade = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={CrossFades} span={crossFadeData} />
        <CardBody>
          <CommonCarousel data={crossFadeDataList} control fade interval="2500" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default CrossFade;
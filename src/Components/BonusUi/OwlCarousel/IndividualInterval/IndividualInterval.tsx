import { Card, CardBody, Col } from "reactstrap";
import IndividualIntervalBody from "./IndividualIntervalBody";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { IndividualCarouselItemIntervals } from "@/Constant";
import { itemIntervalData } from "@/Data/BonusUi/OwlCarousel";

const IndividualInterval = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={IndividualCarouselItemIntervals} span={itemIntervalData} />
        <CardBody>
          <IndividualIntervalBody />
        </CardBody>
      </Card>
    </Col>
  );
};

export default IndividualInterval;

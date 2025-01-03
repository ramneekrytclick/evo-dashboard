import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { DisableTouchSwipingTitle } from "@/Constant";
import { disableTouchData, disableTouchDataList } from "@/Data/BonusUi/OwlCarousel";

const DisableTouchSwiping = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={DisableTouchSwipingTitle} span={disableTouchData} />
        <CardBody>
          <CommonCarousel data={disableTouchDataList} control />
        </CardBody>
      </Card>
    </Col>
  )
};

export default DisableTouchSwiping;

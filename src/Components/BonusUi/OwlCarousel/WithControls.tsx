import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { WithControl } from "@/Constant";
import { withControlData, withControlDataList } from "@/Data/BonusUi/OwlCarousel";

const WithControls = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={WithControl} span={withControlData} />
        <CardBody>
          <CommonCarousel data={withControlDataList} control interval="2000" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithControls;
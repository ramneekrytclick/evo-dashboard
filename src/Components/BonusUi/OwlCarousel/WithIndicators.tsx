import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { WithIndicator } from "@/Constant";
import { withIndicatorData, withIndicatorDataList } from "@/Data/BonusUi/OwlCarousel";

const WithIndicators = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={WithIndicator} span={withIndicatorData} />
        <CardBody>
          <CommonCarousel data={withIndicatorDataList} control indecators ride="carousel" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithIndicators;

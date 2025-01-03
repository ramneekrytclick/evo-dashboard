import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { SlideOnly } from "@/Constant";
import { slidesOnlyData, slidesOnlyDataList } from "@/Data/BonusUi/OwlCarousel";

const SlidesOnly = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={SlideOnly} span={slidesOnlyData} />
        <CardBody>
          <CommonCarousel data={slidesOnlyDataList} interval="2000" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default SlidesOnly;

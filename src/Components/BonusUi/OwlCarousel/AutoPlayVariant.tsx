import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { AutoPlayVariants } from "@/Constant";
import { autoPlayData, autoPlayDataList } from "@/Data/BonusUi/OwlCarousel";

const AutoPlayVariant = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={AutoPlayVariants} span={autoPlayData} />
        <CardBody>
          <CommonCarousel data={autoPlayDataList} indecators interval="1500" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default AutoPlayVariant;
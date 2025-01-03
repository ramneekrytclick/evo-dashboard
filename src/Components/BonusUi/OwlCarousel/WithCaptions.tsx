import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { WithCaption } from "@/Constant";
import { withCaptionData, withCaptionDataList } from "@/Data/BonusUi/OwlCarousel";

const WithCaptions = () => {
  return (
    <Col xl={6} xs={12}>
      <Card>
        <CommonCardHeader title={WithCaption} span={withCaptionData} />
        <CardBody className="mt-2 mb-3">
          <CommonCarousel data={withCaptionDataList} control indecators caption ride="carousel" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithCaptions;

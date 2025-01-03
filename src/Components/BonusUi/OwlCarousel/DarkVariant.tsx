import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { DarkVariants } from "@/Constant";
import { darkVariantData, darkVariantDataList } from "@/Data/BonusUi/OwlCarousel";

const DarkVariant = () => {
  return (
    <Col xl={6} sm={12}>
      <Card>
        <CommonCardHeader title={DarkVariants} span={darkVariantData} />
        <CardBody>
          <CommonCarousel dark data={darkVariantDataList} control caption lightCaption indecators />
        </CardBody>
      </Card>
    </Col>
  );
};

export default DarkVariant;

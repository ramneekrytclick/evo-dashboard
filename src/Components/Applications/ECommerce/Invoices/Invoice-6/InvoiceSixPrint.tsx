import { Button, Col } from "reactstrap";
import { Cancel, Print } from "@/Constant";
import { useReactToPrint } from "react-to-print";

const InvoiceSixPrint = ({ componentRef }: { componentRef: React.RefObject<HTMLDivElement> }) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Col sm="12" className="text-center mb-3">
      <Button color="primary" className="me-2" onClick={handlePrint}>
        {Print}
      </Button>
      <Button color="secondary">
        {Cancel}
      </Button>
    </Col>
  );
};

export default InvoiceSixPrint;

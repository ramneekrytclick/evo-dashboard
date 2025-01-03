import { Card, CardBody, Col } from "reactstrap";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { JavaModeHeading } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { typScriptData } from "@/Data/Miscellaneous/Editors/Editors";

const JavaMode = () => {
  return (
    <Col xl={6}>
      <Card>
        <CommonCardHeader title={JavaModeHeading} headClass="pb-0" />
        <CardBody>
          <AceEditor
            className="aceEditor w-auto"
            mode="java"
            theme="monokai"
            value={typScriptData}
            name="blah2"
            setOptions={{ useWorker: false }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            editorProps={{ $blockScrolling: true }}
            highlightActiveLine={true}
          />
        </CardBody>
      </Card>
    </Col>
  );
};
export default JavaMode;
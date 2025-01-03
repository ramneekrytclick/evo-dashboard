import React from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader';
import { ClipboardOnParagraphTitle, Copy } from '@/Constant';

const ClipboardOnParagraph = () => {
    const clipboardParagraphText2: string = "On that day, hopes and dreams were crushed. Even though it should have been anticipated, it nonetheless surprised me. The warning indicators have been disregarded in favour of the slim chance that it would actually occur. From a hopeful prospect, it had evolved into an unquestionable conviction that it must be fate. That was up until it wasn't, at which point all of the aspirations and dreams collapsed.";
    return (
        <Col sm={12} md={6}>
            <Card className="height-equal">
                <CommonCardHeader headClass='pb-0' title={ClipboardOnParagraphTitle} />
                <CardBody>
                    <div className="clipboaard-container">
                        <p className="f-16">{'Copy from paragraph'}</p>
                        <CopyToClipboard text={clipboardParagraphText2} onCopy={() => toast.info("text successfully copied")}>
                            <h6 className="border rounded f-w-300">
                                <CardBody>{clipboardParagraphText2}</CardBody>
                            </h6>
                        </CopyToClipboard>
                        <div className="mt-3 text-end">
                            <CopyToClipboard text={clipboardParagraphText2} onCopy={() => toast.info("text successfully copied")}>
                                <Button className="btn-clipboard" color="info">
                                    <i className="fa fa-copy" /> {Copy}
                                </Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}
export default ClipboardOnParagraph;
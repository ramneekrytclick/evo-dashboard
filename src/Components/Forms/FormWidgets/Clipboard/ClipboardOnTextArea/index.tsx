import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Input } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader';
import { ClipboardOnTextAreaTitle, Copy, Cut } from '@/Constant';

const ClipboardOnTextArea = () => {
    const clipboardOnTextAreaText: string = "A web designer must always enhance their work since creating websites is a creative effort. Therefore, a web designer must be more imaginative to produce exceptional results. Blogs about web design assist web designers in learning about new technologies, offer lessons, news, direction for a freebie, and much more. These blogs allow web designers to stay creative and improve their abilities. Therefore, advice from web design blogs is required to improve your business."
    const [clipBoardOnTextAreaValue, setClipBoardOnTextAreaValue] = useState(clipboardOnTextAreaText);
    return (
        <Col sm={12} md={6}>
            <Card>
                <CommonCardHeader headClass='pb-0' title={ClipboardOnTextAreaTitle} />
                <CardBody>
                    <div className="clipboaard-container">
                        <p className="f-16">{"Cut/copy from textarea"}</p>
                        <Input type="textarea" onChange={(event) => setClipBoardOnTextAreaValue(event.target.value)} className="f-14 custom-scrollbar" rows={1} value={clipBoardOnTextAreaValue} />
                        <div className="mt-3 text-end">
                            <CopyToClipboard text={clipBoardOnTextAreaValue} onCopy={() => toast.info("text successfully copied")}>
                                <Button className="btn-clipboard me-2" color="warning">
                                    <i className="fa fa-copy" /> {Copy}
                                </Button>
                            </CopyToClipboard>
                            <CopyToClipboard text={clipBoardOnTextAreaValue} onCopy={() => { toast.info("text successfully cut"); setClipBoardOnTextAreaValue(""); }}>
                                <Button className="btn-clipboard-cut" color="success">
                                    <i className="fa fa-cut" /> {Cut}
                                </Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}
export default ClipboardOnTextArea;
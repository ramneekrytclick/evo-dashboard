import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Input } from 'reactstrap';
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from 'react-toastify';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader';
import { ClipBoardOnTextInputTitle, Copy, Cut } from '@/Constant';

const ClipboardOnTextInput = () => {
    const [inputValue, setInputValue] = useState("");
    return (
        <Col sm={12} md={6}>
            <Card>
                <CommonCardHeader headClass='pb-0' title={ClipBoardOnTextInputTitle} />
                <CardBody>
                    <div className="clipboaard-container">
                        <p className="f-16">{"Cut/copy from text input"}</p>
                        <Input type="text" placeholder="type some text to copy / cut" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                        <div className="mt-3 text-end">
                            <CopyToClipboard text={inputValue} onCopy={() => toast.info("text successfully copied")}>
                                <Button className="btn-clipboard me-2" color="primary"><i className="fa fa-copy" /> {Copy}</Button>
                            </CopyToClipboard>
                            <CopyToClipboard text={inputValue} onCopy={() => toast.info("text successfully cut")}>
                                <Button className="btn-clipboard-cut" color="secondary">
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
export default ClipboardOnTextInput;
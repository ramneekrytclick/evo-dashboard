import React from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader';
import { CopyHighlightedText, CopyPortionParagraphTitle } from '@/Constant';

const CopyPortionFromParagraph = () => {
    return (
        <Col sm={12} md={6}>
            <Card className="height-equal">
                <CommonCardHeader headClass='pb-0' title={CopyPortionParagraphTitle} />
                <CardBody>
                    <div className="clipboaard-container">
                        <p className="f-16">{'Copy portion from paragraph'}</p>
                        <h6 className="border rounded f-w-300">
                            <CardBody>
                                <span className="bg-primary text-white p-1">{"Web design is the process of creating websites "}</span>
                                {"that are visible online. Take a website design course to learn how to  create an appealing and responsive website. In the discipline of web design, there are degree, diploma, postgraduate degree, and certificate programmes. A web designer is responsible for a website's look, feel, and occasionally even content."}
                            </CardBody>
                        </h6>
                        <div className="mt-3 text-end">
                            <CopyToClipboard text={'Web design is the process of creating websites'} onCopy={() => toast.info("text successfully copied")}>
                                <Button className="btn-clipboard" color="secondary"><i className="fa fa-copy" /> {CopyHighlightedText}</Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}
export default CopyPortionFromParagraph;
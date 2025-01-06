import React, { ChangeEvent, useState } from 'react'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { ActiveCallbackProp } from '@/Types/ECommerce.type';
import { PriceLearning, PromoCodes } from '@/Constant';
import SVG from '@/CommonComponent/SVG';

const SellingPrice: React.FC<ActiveCallbackProp> = ({ activeCallBack }) => {
    const [formData, setFormData] = useState({ initialCost: "", sellingPrice: "", currency: "", stocks: "", })
    const { initialCost, sellingPrice, currency, stocks } = formData;
    const updateFormData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleNextButton = () => {
        if (initialCost !== "" && sellingPrice !== "" && currency !== "" && stocks !== "") {
            activeCallBack(5);
        } else {
            return toast.error("Please fill out details before moving on to the next step");
        }
    };
    return (
        <div className="sidebar-body">
            <Form className="price-wrapper">
                <Row className="g-3 custom-input">
                    <Col sm={6}>
                        <Label>{PriceLearning} <span className="txt-danger">{'*'}</span></Label>
                        <Input type="number" name='initialCost' value={initialCost} onChange={updateFormData} />
                    </Col>
                    <Col sm={6}>
                        <Label>{PromoCodes} <span className="txt-danger">{'*'}</span></Label>
                        <Input type="number" name='initialCost' value={initialCost} onChange={updateFormData} />
                    </Col>
                    

                </Row>
                <div className="product-buttons">
                    <Button color='transparent' className='me-1' onClick={() => activeCallBack(3)}>
                        <div className="d-flex align-items-center gap-sm-2 gap-1">
                            <SVG iconId='back-arrow' /> {'Previous'}
                        </div>
                    </Button>
                    <Button color='transparent' onClick={handleNextButton}>
                        <div className="d-flex align-items-center gap-sm-2 gap-1">
                        {'Next'} <SVG iconId='front-arrow' /> 
                        </div>
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default SellingPrice
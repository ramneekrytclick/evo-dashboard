import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { PriceLearning, PromoCodes } from '@/Constant';
import SVG from '@/CommonComponent/SVG';
import { CourseFormProps } from '@/Types/Course.type';

interface SellingPriceProps {
    activeCallBack: (tab: number) => void;
    data:CourseFormProps;
    setData:(data:CourseFormProps)=>void
}
const SellingPrice: React.FC<SellingPriceProps> = ({ activeCallBack,data,setData }) => {
    const [formData, setFormData] = useState({ initialCost: "", promocode:"" })
    const { initialCost, promocode } = formData;
    const updateFormData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleNextButton = () => {
        if (initialCost !== "") {
            activeCallBack(3);
        } else {
            return toast.error("Please fill out details before moving on to the next step");
        }
    };
    useEffect(()=>{
		setData({...data,price:formData.initialCost,promoCodes:formData.promocode.split('')});
    },[formData])
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
                        <Input type="text" name='promocode' value={promocode} onChange={updateFormData} />
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
import React, { useState } from 'react'
import { Col, Label, Row } from 'reactstrap';
import TagsInput from "react-tagsinput";
import { ProductTagProp } from '@/Types/ECommerce.type';
import { productTagItem } from '@/Data/Applications/ECommerce/Product';

const ProductTag: React.FC<ProductTagProp> = ({ title, subTitle }) => {
    const [tags, setTags] = useState(productTagItem);
    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
    };
    return (
        <Col sm={6}>
            <Row className="g-2 product-tag">
                <Col xs={12}>
                    <Label className="d-block m-0">{title}</Label>
                </Col>
                <Col xs={12}>
                    <TagsInput value={tags} onChange={handleTagsChange} />
                    {subTitle && <p className="f-light">{"Products can be tagged"}</p>}
                </Col>
            </Row>
        </Col>
    )
}
export default ProductTag
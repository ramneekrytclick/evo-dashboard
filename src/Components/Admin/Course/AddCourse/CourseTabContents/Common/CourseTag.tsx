import React, { useState } from 'react'
import { Col, Label, Row } from 'reactstrap';
import TagsInput from "react-tagsinput";
import { CourseTagProp } from '@/Types/Course.type';
import { courseTagItem } from '@/Data/Admin/Courses/Course';

const CourseTag: React.FC<CourseTagProp> = ({ title}) => {
    const [tags, setTags] = useState(courseTagItem);
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
                </Col>
            </Row>
        </Col>
    )
}
export default CourseTag
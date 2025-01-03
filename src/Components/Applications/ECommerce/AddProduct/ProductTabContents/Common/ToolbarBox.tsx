import React, { useState } from 'react'
import { Col, Label } from 'reactstrap';
import ReactQuill from 'react-quill';
import { ToolbarBoxProp } from '@/Types/ECommerce.type';

const ToolbarBox: React.FC<ToolbarBoxProp> = ({ label, paragraph }) => {
    const [value, setValue] = useState('Enter your messages...');

    return (
        <Col xs={12}>
            {label && <Col xs={12}><Label>{'Additional Description'}</Label></Col>}
            <div className="toolbar-box">
                <ReactQuill value={value} onChange={setValue} />
            </div>
            <p className="f-light">{paragraph}</p>
        </Col>
    )
}
export default ToolbarBox;
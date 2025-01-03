import React, { useRef } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import { Printer } from 'react-feather';
import { Href } from '@/Constant';
import CreatedByMeTable from './CreatedByMeTable';

const TaskList=()=> {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <Card className="mb-0">
            <CardHeader className="d-flex pb-0">
                <h4 className="mb-0">{'Created by me'}</h4>
                <ReactToPrint
                    trigger={() => (
                        <a href={Href}>
                            <Printer className="me-2" /> {'Print'}
                        </a>
                    )}
                    content={() => componentRef.current}
                />
            </CardHeader>
            <CardBody className="p-0">
                <CreatedByMeTable componentRef={componentRef} />
            </CardBody>
        </Card>
    )
}
export default TaskList;
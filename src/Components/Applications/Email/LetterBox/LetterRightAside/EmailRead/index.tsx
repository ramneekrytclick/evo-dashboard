import React, { useRef } from 'react'
import { Card } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import UserMail from './UserMail';
import MailBody1 from './MailBody1';
import { useAppSelector } from '@/Redux/Hooks';

const EmailRead = () => {
    const { interviewEmail } = useAppSelector((state) => state.letterbox);
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Card className={`email-body email-read ${interviewEmail ? "show" : "hide"}`}>
            <MailBody1 />
            <div className="mail-body-wrapper" ref={componentRef}>
                <UserMail handlePrint={handlePrint} />
            </div>
        </Card>
    )
}
export default EmailRead;
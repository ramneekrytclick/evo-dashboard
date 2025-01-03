import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import DownloadLink from 'react-download-link';
import SVG from '@/CommonComponent/SVG';
import Image from 'next/image';
import { ImagePath } from '@/Constant';

const UserFooter = () => {
    const [value, setValue] = useState('Enter Your Messages..');

    return (
        <div className="user-footer">
            <div>
                <SVG iconId='attchment' />
                <span className="f-light">{'Attachments'}</span>
            </div>
            <div className="d-inline-block">
                <div className="attchment-file common-flex">
                    <div className="common-flex align-items-center">
                        <Image src={`${ImagePath}/email-template/pdfs.png`} width={30} height={36} alt="pdf" />
                        <div className="d-block">
                            <p>{'Offer_Letter.pdf'}</p>
                            <p>{'200KB'}</p>
                        </div>
                    </div>
                    <DownloadLink filename="myfile.txt" label={<i className="fa fa-download f-light" />} />
                </div>
            </div>
            <div className="toolbar-box">
                <ReactQuill value={value} onChange={setValue} />
            </div>
        </div>
    );
}
export default UserFooter;
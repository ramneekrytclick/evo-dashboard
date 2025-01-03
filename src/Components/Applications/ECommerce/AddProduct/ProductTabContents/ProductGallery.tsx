import React, { useState } from 'react';
import { Button, Form } from 'reactstrap';
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { ActiveCallbackProp } from '@/Types/ECommerce.type';
import { productGalleryData } from '@/Data/Applications/ECommerce/Product';
import SVG from '@/CommonComponent/SVG';

const ProductGallery: React.FC<ActiveCallbackProp> = ({ activeCallBack }) => {
    const [filesMap, setFilesMap] = useState<Record<string, ExtFile[]>>({});

    const updateFiles = (id: string, incomingFiles: ExtFile[]) => {
        setFilesMap(prevFilesMap => ({
            ...prevFilesMap,
            [id]: incomingFiles,
        }));
    };

    const removeFile = (itemId: string, fileId: string | number | undefined) => {
        setFilesMap(prevFilesMap => ({
            ...prevFilesMap,
            [itemId]: prevFilesMap[itemId].filter(file => file.id !== fileId),
        }));
    };

    return (
        <div className="sidebar-body">
            {productGalleryData.map((item:any) => (
                <div className="product-upload" key={item.id}>
                    <p>{item.title}</p>
                    <Dropzone
                        onChange={(incomingFiles) => updateFiles(item.id, incomingFiles)}
                        value={filesMap[item.id] || []}
                        maxFiles={1}
                        header={false}
                        footer={false}
                        minHeight="80px"
                        name={`fileName_${item.id}`}
                    >
                        {(filesMap[item.id] || []).map((file: ExtFile) => (
                            <FileMosaic
                                key={file.id}
                                {...file}
                                onDelete={() => removeFile(item.id, file.id)}
                                info={true}
                            />
                        ))}
                        {(filesMap[item.id]?.length || 0) === 0 && (
                            <Form className="dropzone dropzone-light dz-clickable py-5">
                                <div className="dz-message needsclick">
                                    <SVG iconId="file-upload1" />
                                    <h6>{'Drag Files Here'}</h6>
                                    <span className="note needsclick">Add Product Gallery Images</span>
                                </div>
                            </Form>
                        )}
                    </Dropzone>
                </div>
            ))}
            <div className="product-buttons">
                <Button color='transparent' className='me-1' onClick={() => activeCallBack(1)}>
                    <div className="d-flex align-items-center gap-sm-2 gap-1">
                        <SVG iconId='back-arrow' /> {'Previous'}
                    </div>
                </Button>
                <Button color='transparent' onClick={() => activeCallBack(3)}>
                    <div className="d-flex align-items-center gap-sm-2 gap-1">
                        {'Next'} <SVG iconId='front-arrow' />
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default ProductGallery;


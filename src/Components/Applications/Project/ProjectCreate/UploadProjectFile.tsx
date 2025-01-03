import { Col, FormGroup, Label, Row } from 'reactstrap';
import { Dropzone, FileMosaic, ExtFile } from "@dropzone-ui/react";
import { useState } from 'react';
import { UploadProjectFiles } from '@/Constant';

const UploadProjectFile = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };
  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <Row>
      <Col>
        <FormGroup>
          <Label>{UploadProjectFiles}</Label>
          <Dropzone onChange={updateFiles} value={files} maxFiles={1} header={false} footer={false} minHeight="80px" label="Drag'n drop files here or click to Browse">
            {files.map((file: ExtFile) => (
              <FileMosaic key={file.id} {...file} onDelete={removeFile} info={true} />
            ))}
            {files.length === 0 && (
              <div className="dz-message needsclick p-5">
                <i className="icon-cloud-up fs-1 text-primary" />
                <h4>Drop files here or click to upload.</h4>
                <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
              </div>
            )}
          </Dropzone>
        </FormGroup>
      </Col>
    </Row>
  );
}

export default UploadProjectFile
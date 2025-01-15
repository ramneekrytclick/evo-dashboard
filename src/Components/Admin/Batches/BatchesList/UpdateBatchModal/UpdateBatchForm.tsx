import { updateBatch } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface UpdateBatchFormProps {
  toggle: () => void;
  values: BatchProps;
  fetchData: () => Promise<void>;
}

const UpdateBatchForm = ({ toggle, values, fetchData }: UpdateBatchFormProps) => {
  const [formData, setFormData] = useState<BatchProps>(values);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateBatch(values._id, formData);
      toast("Batch updated successfully!");
      fetchData();
      toggle();
    } catch (error) {
      console.error(error);
      alert("Error updating Batch!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={6}>
          <Label htmlFor="name">Batch Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter batch name"
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="batchStatus">Batch Status</Label>
          <Input
            id="batchStatus"
            name="batchStatus"
            type="text"
            value={formData.batchStatus}
            onChange={handleChange}
            placeholder="Enter batch status"
          />
        </Col>
        <Col md={12}>
          <Label htmlFor="courseId">Course ID</Label>
          <Input
            id="courseId"
            name="courseId"
            type="text"
            value={typeof formData.courseId === "object" ? formData.courseId?._id : formData.courseId}
            onChange={handleChange}
            placeholder="Enter course ID"
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={
              formData.startDate
                ? new Date(formData.startDate).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={
              formData.startDate
                ? new Date(formData.endDate).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        </Col>
        <Col md={12}>
          <Button color="primary" type="submit">
            Update Batch
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateBatchForm;

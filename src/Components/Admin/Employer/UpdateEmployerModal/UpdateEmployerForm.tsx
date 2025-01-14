import { updateEmployer } from "@/app/api/admin/employers"; // Update this path if necessary
import { EmployerProps } from "@/Types/Employer.type";
import { FormEvent, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface UpdateEmployerFormProps {
  toggle: () => void;
  values: EmployerProps;
  fetchData:()=>Promise<void>
}

const UpdateEmployerForm = ({ toggle, values,fetchData }: UpdateEmployerFormProps) => {
  const [formData, setFormData] = useState<EmployerProps>(values);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateEmployer(values._id, formData);
      alert("Employer updated successfully!");
      fetchData();
      toggle();
    } catch (error) {
      console.error(error);
      alert("Error updating employer!");
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
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            type="text"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
          />
        </Col>
        <Col md={12}>
          <Label htmlFor="photo">Photo</Label>
          <Input
            id="photo"
            name="photo"
            type="text"
            value={formData.photo || ""}
            onChange={handleChange}
            placeholder="Enter photo URL"
          />
        </Col>
        <Col md={12}>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            name="industry"
            type="text"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Enter industry"
          />
        </Col>
        <Col md={12}>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </Col>
        <Col md={12}>
          <Label htmlFor="companySize">Company Size</Label>
          <Input
            id="companySize"
            name="companySize"
            type="text"
            value={formData.companySize}
            onChange={handleChange}
            placeholder="Enter company size"
          />
        </Col>
        <Col md={12}>
          <Button color="primary" type="submit">
            Update Employer
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateEmployerForm;

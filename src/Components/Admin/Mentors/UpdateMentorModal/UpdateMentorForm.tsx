import { updateMentor } from "@/app/api/admin/mentors";
import { AddMentorFormProps, MentorDataProps } from "@/Types/Mentor.type";
import { FormEvent, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface UpdateMentorFormProps {
  toggle: () => void;
  values: MentorDataProps;
}

const UpdateMentorForm = ({ toggle, values }: UpdateMentorFormProps) => {
  const [formData, setFormData] = useState<AddMentorFormProps>({...values,password:""});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateMentor(values._id!, formData);
      // console.log("DATA: ",formData)
      // console.log(response);
      alert("Mentor updated successfully!");
      toggle();
    } catch (error) {
      console.error(error);
      alert("Error updating mentor!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "assignedCourses" | "assignedBatches"
  ) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [key]: prevState[key]?.includes(value)
        ? prevState[key].filter((item) => item !== value)
        : [...prevState[key], value],
    }));
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
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </Col>
        <Col md={6}>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
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
            value={formData.photo}
            onChange={handleChange}
            placeholder="Enter photo URL"
          />
        </Col>
        <Col md={12}>
          <Label htmlFor="about">About</Label>
          <Input
            id="about"
            name="about"
            type="textarea"
            value={formData.about}
            onChange={handleChange}
            placeholder="Enter about information"
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
        {/* <Col md={12}>
          <Label htmlFor="education">Education</Label>
          <Input
            id="education"
            name="education"
            type="text"
            value={formData.education}
            onChange={handleChange}
            placeholder="Enter education details"
          />
        </Col> */}
        <Col md={12}>
          <Label>Assigned Courses</Label>
          <Input
            type="text"
            placeholder="Add a course"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                handleArrayChange(
                  { target: { value: e.currentTarget.value } } as any,
                  "assignedCourses"
                );
                e.currentTarget.value = "";
                e.preventDefault();
              }
            }}
          />
          <div>{formData.assignedCourses?.join(", ")}</div>
        </Col>
        <Col md={12}>
          <Label>Assigned Batches</Label>
          <Input
            type="text"
            placeholder="Add a batch"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                handleArrayChange(
                  { target: { value: e.currentTarget.value } } as any,
                  "assignedBatches"
                );
                e.currentTarget.value = "";
                e.preventDefault();
              }
            }}
          />
          <div>{formData.assignedBatches?.join(", ")}</div>
        </Col>
        <Col md={12}>
          <Button color="primary" type="submit">
            Update Mentor
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateMentorForm;

import { updateStudent } from "@/app/api/admin/students";
import { StudentProps } from "@/Types/Student.type";
import { FormEvent, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface UpdateStudentFormProps {
  toggle: () => void;
  values: StudentProps;
}

const UpdateStudentForm = ({ toggle, values }: UpdateStudentFormProps) => {
  const [formData, setFormData] = useState<StudentProps>(values);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateStudent(values._id, formData);
      console.log("DATA: ", formData);
      console.log(response);
      alert("Student updated successfully!");
      toggle();
    } catch (error) {
      console.error(error);
      alert("Error updating student!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (key: keyof StudentProps, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: Array.isArray(prevState[key])
        ? (prevState[key] as string[]).includes(value)
          ? (prevState[key] as string[]).filter((item) => item !== value)
          : [...(prevState[key] as string[]), value]
        : [value],
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
          <Label htmlFor="guardianName">Guardian Name</Label>
          <Input
            id="guardianName"
            name="guardianName"
            type="text"
            value={formData.guardianName}
            onChange={handleChange}
            placeholder="Enter guardian name"
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
          <Label htmlFor="coursesEnrolled">Courses Enrolled</Label>
          <Input
            type="text"
            placeholder="Add a course"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                handleArrayChange("coursesEnrolled", e.currentTarget.value);
                e.currentTarget.value = "";
                e.preventDefault();
              }
            }}
          />
          <div>
            {Array.isArray(formData.coursesEnrolled)
              ? formData.coursesEnrolled.join(", ")
              : formData.coursesEnrolled}
          </div>
        </Col>
        <Col md={12}>
          <Label htmlFor="interests">Interests</Label>
          <Input
            type="text"
            placeholder="Add an interest"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                handleArrayChange("interests", e.currentTarget.value);
                e.currentTarget.value = "";
                e.preventDefault();
              }
            }}
          />
          <div>
            {Array.isArray(formData.interests)
              ? formData.interests.join(", ")
              : formData.interests}
          </div>
        </Col>
        <Col md={12}>
          <Label htmlFor="languagesPreferred">Languages Preferred</Label>
          <Input
            type="text"
            placeholder="Add a language"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                handleArrayChange("languagesPreferred", e.currentTarget.value);
                e.currentTarget.value = "";
                e.preventDefault();
              }
            }}
          />
          <div>
            {Array.isArray(formData.languagesPreferred)
              ? formData.languagesPreferred.join(", ")
              : formData.languagesPreferred}
          </div>
        </Col>
        <Col md={12}>
          <Button color="primary" type="submit">
            Update Student
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateStudentForm;

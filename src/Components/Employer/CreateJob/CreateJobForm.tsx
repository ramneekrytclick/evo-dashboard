"use client";

import { createJob } from "@/app/api/employer";
import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: [] as string[],
    location: "",
    salary: "",
  });
  const [skill, setSkill] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSkill = () => {
    if (skill.trim()) {
      setFormData({ ...formData, skillsRequired: [...formData.skillsRequired, skill.trim()] });
      setSkill("");
    } else {
      toast.error("Skill cannot be empty!");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.skillsRequired.filter((_, i) => i !== index);
    setFormData({ ...formData, skillsRequired: updatedSkills });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and Description are required!");
      return;
    }

    try {
      const response = await createJob(formData);
      console.log(response);
      toast.success("Job created successfully!");
      setFormData({
        title: "",
        description: "",
        skillsRequired: [],
        location: "",
        salary: "",
      });
    } catch (error) {
      toast.error("Error creating job. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <Row className="g-3">
        <Col sm={6}>
          <Label>
            {"Job Title"}
            <span className="txt-danger">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Job Title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
          />
        </Col>
        <Col sm={6}>
          <Label>
            {"Location"}
          </Label>
          <Input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
          />
        </Col>
      </Row>
      <Row className="g-3 mt-3">
        <Col>
          <Label>
            {"Description"}
            <span className="txt-danger">*</span>
          </Label>
          <Input
            type="textarea"
            placeholder="Job Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            rows="4"
          />
        </Col>
      </Row>
      <Row className="g-3 mt-3">
        <Col>
          <Label>{"Skills Required"}</Label>
          <Row>
            <Col sm={10}>
              <Input
                type="text"
                placeholder="Enter a skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button color="primary" onClick={addSkill}>
                Add Skill
              </Button>
            </Col>
          </Row>
          <ul className="mt-3">
            {formData.skillsRequired.map((skill, index) => (
              <li key={index} className="my-2 p-2 bg-light text-dark rounded-3">
                <Row>
                  <Col sm={10}>{skill}</Col>
                  <Col sm={2}>
                    <Button color="danger" size="sm" onClick={() => removeSkill(index)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row className="g-3 mt-3">
        <Col sm={6}>
          <Label>{"Salary"}</Label>
          <Input
            type="text"
            placeholder="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleFormChange}
          />
        </Col>
      </Row>
      <Col xs={12} className="text-end mt-4">
        <Button color="primary" type="submit">
          Create Job
        </Button>
      </Col>
    </Form>
  );
};

export default CreateJobForm;
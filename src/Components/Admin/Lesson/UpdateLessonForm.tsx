import React, { useState, useEffect, FormEvent } from "react";
import { LessonFormProps } from "@/Types/Lesson.type";
import { updateLesson } from "@/app/api/admin/lessons/lesson";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";

interface UpdateLessonFormProps {
    toggle: () => void;
    values: LessonFormProps;
    fetchData: () => Promise<void>;
	courseId:string;
}

const UpdateLessonForm = ({ toggle, values, fetchData,courseId }: UpdateLessonFormProps) => {
    const [formData, setFormData] = useState<LessonFormProps>({ ...values });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
		
        try {
            await updateLesson(formData._id!, formData,courseId);
            toast.success("Lesson updated successfully!");
            fetchData();
            toggle();
        } catch (error) {
            console.error(error);
            toast.error("Error updating lesson!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md={12}>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter lesson title"
                        required
                    />
                </Col>
                <Col md={12}>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        type="textarea"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter lesson description"
                        required
                    />
                </Col>
                {/* Fields for videos, quizzes, and assignments can be added here */}
                <Col md={12} className="text-end">
                    <Button outline color="primary" type="button" onClick={toggle} disabled={loading}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" disabled={loading} className="ms-2">
                        {loading ? "Updating..." : "Update Lesson"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default UpdateLessonForm;
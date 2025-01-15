import { useEffect, useState, FormEvent } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { CourseProps } from "@/Types/Course.type";
import { Category, Subcategory } from "@/Types/Category.type";

import { toast } from "react-toastify";
import { getCategories } from "@/app/api/admin/categories";
import { getMentors } from "@/app/api/admin/mentors";
import { getManagers } from "@/app/api/admin/managers";
import { getSubcategories } from "@/app/api/admin/subcategories";
import { updateCourse } from "@/app/api/admin/course";

interface EditCourseFormProps {
    toggle: () => void;
    values: CourseProps;
    fetchData: () => Promise<void>;
}

interface MentorOrManager {
    id: string;
    name: string;
    email: string;
}

const EditCourseForm = ({ toggle, values, fetchData }: EditCourseFormProps) => {
    const [formData, setFormData] = useState<CourseProps>(values);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [mentors, setMentors] = useState<MentorOrManager[]>([]);
    const [managers, setManagers] = useState<MentorOrManager[]>([]);
    const [isSubcategoriesDisabled, setIsSubcategoriesDisabled] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            return response.categories || [];
        } catch (error) {
            toast.error("Error Fetching Categories!");
            return [];
        }
    };

    const fetchMentors = async () => {
        try {
            const response = await getMentors();
            return response.mentors || [];
        } catch (error) {
            toast.error("Error Fetching Mentors!");
            return [];
        }
    };

    const fetchManagers = async () => {
        try {
            const response = await getManagers();
            return response.managers || [];
        } catch (error) {
            toast.error("Error Fetching Managers!");
            return [];
        }
    };

    const fetchSubcategories = async (id: string) => {
        try {
            const response = await getSubcategories(id);
            return response.subcategories || [];
        } catch (error) {
            toast.error("Error Fetching Subcategories!");
            return [];
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                const fetchedMentors = await fetchMentors();
                const fetchedManagers = await fetchManagers();

                setCategories(fetchedCategories);
                setMentors(fetchedMentors);
                setManagers(fetchedManagers);
            } catch (error) {
                console.error("Error fetching dropdown options:", error);
            }
        };

        fetchInitialData();
    }, []);

    const handleCategoryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCategoryId = e.target.value;
        setFormData({ ...formData, category: selectedCategoryId, subcategory: "" }); // Reset subcategory
        setIsSubcategoriesDisabled(true);

        if (selectedCategoryId) {
            try {
                const fetchedSubcategories = await fetchSubcategories(selectedCategoryId);
                setSubcategories(fetchedSubcategories);
                setIsSubcategoriesDisabled(false);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateCourse(values._id!, formData);
            toast.success("Course updated successfully!");
            fetchData();
            toggle();
        } catch (error) {
            console.error(error);
            toast.error("Error updating course!");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                        placeholder="Enter course name"
                    />
                </Col>
                <Col md={6}>
                    <Label htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        name="category"
                        type="select"
                        value={formData.category as string}
                        onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </Input>
                </Col>
                <Col md={6}>
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Input
                        id="subcategory"
                        name="subcategory"
                        type="select"
                        value={formData.subcategory as string}
                        onChange={(e) =>
                            setFormData({ ...formData, subcategory: e.target.value })
                        }
                        disabled={isSubcategoriesDisabled}>
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory._id} value={subcategory._id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </Input>
                </Col>
                <Col md={6}>
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
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
                        placeholder="Enter course description"
                    />
                </Col>
                <Col md={6}>
                    <Label htmlFor="mentorAssigned">Mentor Assigned</Label>
                    <Input
                        id="mentorAssigned"
                        name="mentorAssigned"
                        type="select"
                        value={formData.mentorAssigned?.id}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                mentorAssigned: mentors.find((mentor) => mentor.id === e.target.value) || formData.mentorAssigned,
                            })
                        }>
                        <option value="">Select Mentor</option>
                        {mentors.map((mentor) => (
                            <option key={mentor.id} value={mentor.id}>
                                {mentor.name} ({mentor.email})
                            </option>
                        ))}
                    </Input>
                </Col>
                <Col md={6}>
                    <Label htmlFor="managerAssigned">Manager Assigned</Label>
                    <Input
                        id="managerAssigned"
                        name="managerAssigned"
                        type="select"
                        value={formData.managerAssigned?.id}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                managerAssigned: managers.find((manager) => manager.id === e.target.value) || formData.managerAssigned,
                            })
                        }>
                        <option value="">Select Manager</option>
                        {managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                                {manager.name} ({manager.email})
                            </option>
                        ))}
                    </Input>
                </Col>
                <Col md={12} className="text-end">
                    <Button color="primary" type="submit">
                        Update Course
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default EditCourseForm;

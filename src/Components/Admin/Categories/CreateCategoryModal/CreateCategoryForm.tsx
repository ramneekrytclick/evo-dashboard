import { createCategory } from "@/app/api/admin/categories";
import { updateStudent } from "@/app/api/admin/students";
import { Category } from "@/Types/Category.type";
import { StudentProps } from "@/Types/Student.type";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface CreateCategoryFormProps {
	toggle: () => void;
	fetchData: () => Promise<void>;
}

const CreateCategoryForm = ({ toggle, fetchData }: CreateCategoryFormProps) => {
	const [formData, setFormData] = useState<Category>({ name: "" });

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await createCategory(formData);
			console.log(response);
			toast.success("Category created successfully!");
			fetchData();
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

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="name">Category Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter name"
					/>
				</Col>
				<Col md={12}>
					<Button
						color="primary"
						type="submit">
						Create Category
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateCategoryForm;

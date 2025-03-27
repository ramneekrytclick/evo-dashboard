import { createCategory } from "@/app/api/admin/categories";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface CreateCategoryFormProps {
	toggle: () => void;
	fetchData: () => Promise<void>;
}

const CreateCategoryForm = ({ toggle, fetchData }: CreateCategoryFormProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		photo: null as File | null,
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = new FormData();
			data.append("title", formData.title);
			data.append("description", formData.description);
			if (formData.photo) data.append("photo", formData.photo);

			await createCategory(data);
			toast.success("Category created successfully!");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Error creating category!");
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData({ ...formData, photo: e.target.files[0] });
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="title">Category Title</Label>
					<Input
						id="title"
						name="title"
						type="text"
						value={formData.title}
						onChange={handleChange}
						placeholder="Enter title"
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
						placeholder="Optional description"
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="photo">Category Icon</Label>
					<Input
						id="photo"
						name="photo"
						type="file"
						accept="image/*"
						onChange={handleFileChange}
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

import { createSubcategory } from "@/app/api/admin/subcategories";
import { Subcategory } from "@/Types/Category.type";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface CreateSubcategoryFormProps {
	toggle: () => void;
	fetchData: () => Promise<void>;
    id:string;
}
const CreateSubcategoryForm = ({
	toggle,
	fetchData,
    id
}: CreateSubcategoryFormProps) => {
	const [formData, setFormData] = useState<Subcategory>({
		name: "",
		categoryId: id,
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await createSubcategory(formData);
			console.log(response);
			toast("Subcategory created successfully!");
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
						Create Subcategory
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateSubcategoryForm;

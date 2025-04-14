import { getCategories } from "@/app/api/admin/categories";
import { createSubcategory } from "@/app/api/admin/subcategories";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface CreateSubcategoryFormProps {
	toggle: () => void;
	fetchData: () => Promise<void>;
	id?: string;
}

const CreateSubcategoryForm = ({
	toggle,
	fetchData,
	id,
}: CreateSubcategoryFormProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		photo: null as File | null,
	});
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [categories, setCategories] = useState<
		{ _id: string; title: string }[]
	>([]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = new FormData();
			data.append("title", formData.title);
			data.append("description", formData.description);
			data.append("categoryId", id || selectedCategoryId);
			if (formData.photo) data.append("photo", formData.photo);

			await createSubcategory(data);
			toast.success("Subcategory created successfully!");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Error creating subcategory!");
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

	const fetchCategories = async () => {
		try {
			const response = await getCategories();
			setCategories(response);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load categories");
		}
	};

	useEffect(() => {
		if (!id) fetchCategories();
	}, [id]);

	return (
		<Form onSubmit={handleSubmit}>
			<Row className='g-3'>
				{/* Category dropdown if id is NOT provided */}
				{!id && (
					<Col md={12}>
						<Label htmlFor='categoryId'>Select Category</Label>
						<Input
							id='categoryId'
							name='categoryId'
							type='select'
							value={selectedCategoryId}
							onChange={(e) => setSelectedCategoryId(e.target.value)}
							required>
							<option value=''>-- Select Category --</option>
							{categories.map((cat) => (
								<option
									key={cat._id}
									value={cat._id}>
									{cat.title}
								</option>
							))}
						</Input>
					</Col>
				)}

				<Col md={12}>
					<Label htmlFor='title'>Subcategory Title</Label>
					<Input
						id='title'
						name='title'
						type='text'
						value={formData.title}
						onChange={handleChange}
						placeholder='Enter title'
						required
					/>
				</Col>

				<Col md={12}>
					<Label htmlFor='description'>Description</Label>
					<Input
						id='description'
						name='description'
						type='textarea'
						value={formData.description}
						onChange={handleChange}
						placeholder='Optional description'
					/>
				</Col>

				<Col md={12}>
					<Label htmlFor='photo'>Subcategory Icon</Label>
					<Input
						id='photo'
						name='photo'
						type='file'
						accept='image/*'
						onChange={handleFileChange}
					/>
				</Col>

				<Col md={12}>
					<Button
						color='primary'
						type='submit'>
						Create Subcategory
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateSubcategoryForm;

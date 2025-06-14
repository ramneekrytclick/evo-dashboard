import { createCategory } from "@/app/api/admin/categories";
import { FormEvent, useEffect, useState } from "react";
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
	const [preview, setPreview] = useState<string | null>(null);
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		// Set photo preview
		if (formData.photo) {
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result as string);
			reader.readAsDataURL(formData.photo);
		} else {
			setPreview(null);
		}
	}, [formData.photo]);

	useEffect(() => {
		// Basic form validation
		const isFilled =
			formData.title.trim() !== "" &&
			formData.description.trim() !== "" &&
			formData.photo !== null;
		setIsValid(isFilled);
	}, [formData]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const data = new FormData();
		data.append("title", formData.title);
		data.append("description", formData.description);
		if (formData.photo) data.append("photo", formData.photo);

		await toast
			.promise(createCategory(data), {
				pending: "Creating category...",
				success: "Category created successfully!",
				error: "Error creating category!",
			})
			.then(() => {
				fetchData();
				toggle();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			if (file.size > 2 * 1024 * 1024) {
				toast.error(`File size exceeds 2MB limit.`);
				return;
			}
			setFormData({ ...formData, photo: file });
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className='g-3'>
				<Col md={12}>
					<Label htmlFor='title'>Category Title</Label>
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
						required
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor='photo'>Category Icon</Label>
					<Input
						id='photo'
						name='photo'
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						required
					/>
					{preview && (
						<div className='mt-2'>
							<img
								src={preview}
								alt='Preview'
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									borderRadius: 8,
								}}
							/>
						</div>
					)}
				</Col>
				<Col md={12}>
					<Button
						color='primary'
						type='submit'
						disabled={!isValid}>
						Create Category
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateCategoryForm;

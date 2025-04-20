"use client";

import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import SimpleMdeReact from "react-simplemde-editor";
import { useState } from "react";
import { toast } from "react-toastify";
import { submitBlog } from "@/app/api/publisher/blogs/blog";
import { marked } from "marked"; // ✅ Import marked

const CreateBlogForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState(""); // This is still markdown
	const [tags, setTags] = useState("");
	const [conclusion, setConclusion] = useState("");
	const [image, setImage] = useState<File | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim() || !content.trim()) {
			toast.error("Title and Content are required!");
			return;
		}

		const htmlContent = await marked.parse(content); // ✅ await if parse is async

		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", htmlContent); // ✅ Save HTML instead of markdown
		formData.append("tags", tags);
		formData.append("conclusion", conclusion);
		if (image) formData.append("image", image);

		try {
			await submitBlog(formData);
			toast.success("Blog Created Successfully!");
			setTitle("");
			setContent("");
			setTags("");
			setConclusion("");
			setImage(null);
		} catch (error) {
			toast.error("Error Creating Blog!");
		}
	};

	const handleReset = () => {
		setTitle("");
		setContent("");
		setTags("");
		setConclusion("");
		setImage(null);
	};

	return (
		<Form
			className='needs-validation'
			onSubmit={handleSubmit}>
			<Row>
				<Col sm={12}>
					<FormGroup>
						<Label>Blog Title:</Label>
						<Input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Enter blog title'
						/>
					</FormGroup>

					<FormGroup>
						<Label>Blog Content:</Label>
						<SimpleMdeReact
							value={content}
							onChange={setContent}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Tags (comma-separated):</Label>
						<Input
							type='text'
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							placeholder='e.g. AI, Coding, React'
						/>
					</FormGroup>

					<FormGroup>
						<Label>Conclusion:</Label>
						<Input
							type='textarea'
							value={conclusion}
							onChange={(e) => setConclusion(e.target.value)}
							placeholder='Short conclusion or summary'
						/>
					</FormGroup>

					<FormGroup>
						<Label>Upload Image:</Label>
						<Input
							type='file'
							accept='image/*'
							onChange={(e) => setImage(e.target.files?.[0] || null)}
						/>
					</FormGroup>
				</Col>
			</Row>

			<div className='btn-showcase text-end mt-4'>
				<Button
					color='primary'
					type='submit'>
					Post Blog
				</Button>
				<Button
					color='light'
					type='button'
					onClick={handleReset}>
					Discard
				</Button>
			</div>
		</Form>
	);
};

export default CreateBlogForm;

"use client";

import {
	BlogDiscardButton,
	BlogPostButton,
	PostContent,
	PostTitle,
} from "@/Constant";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import SimpleMdeReact from "react-simplemde-editor";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BlogProps } from "@/Types/Blogs.type";
import { submitBlog } from "@/app/api/creator/blogs/blog";

const CreateBlogForm = () => {
	const [blogData, setBlogData] = useState<BlogProps>({
		title: "",
		content: ""
	});

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleContentChange = (value: string) => {
        setContent(value)
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!blogData.title.trim() || !blogData.content.trim()) {
			toast.error("Title and Content are required!");
			return;
		}

		console.log("Blog Data Submitted:", blogData);
        try {
            const response = await submitBlog(blogData);
            toast.success("Blog Created Successfully!");
            console.log(response);
        } catch (error) {
            toast.error("Error Creating Blog!")
        }
	};

	const handleReset = () => {
		setBlogData({
            ...blogData,
			title: "",
			content: "",
		});
	};

	useEffect(() => {
		setBlogData({...blogData, title: title, content: content });
	}, [title, content]);

	return (
		<div>
			<Form
				className="needs-validation"
				onSubmit={handleSubmit}>
				<Row>
					<Col sm={12}>
						<FormGroup>
							<Label check>{PostTitle}:</Label>
							<Input
								type="text"
								placeholder="Post Title"
								name="title"
                                value={title}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>
						</FormGroup>
						<div className="email-wrapper">
							<div className="theme-form">
								<FormGroup>
									<Label check>{PostContent}:</Label>
									<SimpleMdeReact
										// id="editor_container"
										onChange={handleContentChange}
										// options={{ spellChecker: false }}
									/>
								</FormGroup>
							</div>
						</div>
					</Col>
				</Row>
				<div className="btn-showcase text-end mt-4">
					<Button
						color="primary"
						type="submit">
						{BlogPostButton}
					</Button>
					<Button
						color="light"
						type="button"
						onClick={handleReset}>
						{BlogDiscardButton}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default CreateBlogForm;

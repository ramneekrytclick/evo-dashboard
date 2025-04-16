"use client";
import {
	deleteBlogById,
	getMyBlogs,
	updateBlogById,
} from "@/app/api/publisher/blogs/blog";
import { BlogProps } from "@/Types/Blogs.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Badge,
	Row,
	Col,
	CardFooter,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	FormGroup,
} from "reactstrap";

const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

const statusColors: Record<string, string> = {
	Pending: "warning",
	Approved: "success",
	Rejected: "danger",
};

const MyBlogs = () => {
	const [blogs, setBlogs] = useState<BlogProps[]>([]);
	const [selectedBlog, setSelectedBlog] = useState<BlogProps | null>(null);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const [updateTitle, setUpdateTitle] = useState("");
	const [updateContent, setUpdateContent] = useState("");

	const fetchBlogs = async () => {
		try {
			const response = await getMyBlogs();
			setBlogs(response.blogs);
		} catch (error) {
			toast.error("Error Fetching Blogs!");
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	const handleDelete = async () => {
		if (!selectedBlog) return;
		try {
			await deleteBlogById(selectedBlog._id);
			toast.success("Blog Deleted Successfully!");
			setDeleteModalOpen(false);
			fetchBlogs();
		} catch (error) {
			toast.error("Error Deleting Blog!");
		}
	};

	const handleUpdate = async () => {
		if (!selectedBlog) return;
		try {
			await updateBlogById(selectedBlog._id, {
				title: updateTitle,
				content: updateContent,
			});
			toast.success("Blog Updated Successfully!");
			setUpdateModalOpen(false);
			fetchBlogs();
		} catch (error) {
			toast.error("Error Updating Blog!");
		}
	};

	const openUpdateModal = (blog: BlogProps) => {
		setSelectedBlog(blog);
		setUpdateTitle(blog.title);
		setUpdateContent(blog.content);
		setUpdateModalOpen(true);
	};

	const openDeleteModal = (blog: BlogProps) => {
		setSelectedBlog(blog);
		setDeleteModalOpen(true);
	};

	return (
		<>
			<Row style={{ height: "75vh", overflowY: "scroll" }}>
				{blogs.map((blog) => (
					<Col
						md='4'
						sm='6'
						xs='12'
						key={blog._id}
						className='mb-4'>
						<Card className='h-100 shadow-sm'>
							{blog.image && (
								<CardImg
									top
									width='100%'
									src={`${backendURL}/uploads/${blog.image.replace(
										/^\/+/g,
										""
									)}`}
									alt={blog.title}
									style={{ objectFit: "cover", height: "180px" }}
								/>
							)}
							<CardBody>
								<div className='d-flex justify-content-between align-items-center mb-2'>
									<CardTitle className='mb-0'>
										<Link
											href={`/publisher/my-blogs/${blog._id}`}
											className='text-decoration-none text-dark fw-bold text-capitalize'>
											{blog.title}
										</Link>
									</CardTitle>
									<Badge color={statusColors[blog.status] || "secondary"}>
										{blog.status}
									</Badge>
								</div>
								<CardText
									className='text-muted'
									style={{ fontSize: "0.9rem" }}>
									{blog.conclusion}
								</CardText>
								<div className='mt-2'>
									{blog.tags?.map((tag, idx) => (
										<Badge
											color='primary'
											pill
											className='me-1'
											key={idx}>
											{tag}
										</Badge>
									))}
								</div>
							</CardBody>
							<CardFooter className='d-flex justify-content-between'>
								<Button
									color='primary'
									onClick={() => openUpdateModal(blog)}>
									Update
								</Button>
								<Button
									color='danger'
									onClick={() => openDeleteModal(blog)}>
									Delete
								</Button>
							</CardFooter>
						</Card>
					</Col>
				))}
			</Row>

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={isDeleteModalOpen}
				toggle={() => setDeleteModalOpen(!isDeleteModalOpen)}>
				<ModalHeader toggle={() => setDeleteModalOpen(!isDeleteModalOpen)}>
					Confirm Delete
				</ModalHeader>
				<ModalBody>Are you sure you want to delete this blog?</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						onClick={handleDelete}>
						Delete
					</Button>{" "}
					<Button
						color='secondary'
						onClick={() => setDeleteModalOpen(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			{/* Update Modal */}
			<Modal
				isOpen={isUpdateModalOpen}
				toggle={() => setUpdateModalOpen(!isUpdateModalOpen)}>
				<ModalHeader toggle={() => setUpdateModalOpen(!isUpdateModalOpen)}>
					Update Blog
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label for='updateTitle'>Title</Label>
						<Input
							id='updateTitle'
							value={updateTitle}
							onChange={(e) => setUpdateTitle(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='updateContent'>Content</Label>
						<Input
							type='textarea'
							id='updateContent'
							rows={5}
							value={updateContent}
							onChange={(e) => setUpdateContent(e.target.value)}
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={handleUpdate}>
						Save Changes
					</Button>{" "}
					<Button
						color='secondary'
						onClick={() => setUpdateModalOpen(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default MyBlogs;

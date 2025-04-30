"use client";
import { approveBlog, getBlogBySlug } from "@/app/api/admin/blogs/blog";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { getImageURL } from "@/CommonComponent/imageURL";
import { BlogProps } from "@/Types/Blogs.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Spinner,
} from "reactstrap";

const BlogPage = ({ slug }: { slug: string }) => {
	const [selectedBlog, setSelectedBlog] = useState<BlogProps>();
	const [loading, setLoading] = useState(true);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [pendingStatus, setPendingStatus] = useState<
		"Approved" | "Rejected" | null
	>(null);
	const fetchBlog = async () => {
		setLoading(true);
		try {
			const response = await getBlogBySlug(slug);
			setSelectedBlog(response);
		} catch (error) {
			console.log(error);
			toast.error("Failed to fetch blog");
		} finally {
			setLoading(false);
		}
	};
	const handleApproval = async (
		id: string,
		status: "Approved" | "Rejected"
	) => {
		try {
			await approveBlog(id, status);
			toast.success(`Blog ${status.toLowerCase()} successfully`);
			fetchBlog();
		} catch (error) {
			console.error(error);
			toast.error(`Failed to ${status.toLowerCase()} blog`);
		}
	};

	useEffect(() => {
		fetchBlog();
	}, []);
	if (loading || !selectedBlog) {
		return (
			<div className='text-primary py-5 d-flex justify-content-center align-items-center'>
				Loading...
				<Spinner />{" "}
			</div>
		);
	}
	return (
		<>
			<Breadcrumbs
				title={"Blogs"}
				mainTitle={selectedBlog.title}
				parent={"Admin"}
			/>
			<div className='p-4'>
				{/* <h2 className='text-dark fw-bold py-3'>{selectedBlog.title}</h2> */}

				{selectedBlog.image && (
					<div className='my-4 text-center'>
						<Image
							src={getImageURL(selectedBlog.image, "blogs")}
							alt={selectedBlog.title}
							width={800}
							height={400}
							style={{
								width: "500px",
								height: "250px",
								objectFit: "cover",
								borderRadius: "8px",
							}}
						/>
					</div>
				)}

				<div
					style={{
						lineHeight: "1.8",
						fontSize: "1.1rem",
						color: "#333",
						wordBreak: "break-word",
					}}
					dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
				/>

				{selectedBlog.conclusion && (
					<>
						<hr />
						<h5>Conclusion</h5>
						<p>{selectedBlog.conclusion}</p>
					</>
				)}

				<div className='d-flex gap-2 mt-4'>
					{selectedBlog.status !== "Approved" && (
						<Button
							color='success'
							onClick={() => {
								setPendingStatus("Approved");
								setConfirmModalOpen(true);
							}}>
							Approve
						</Button>
					)}
					{selectedBlog.status !== "Rejected" && (
						<Button
							color='danger'
							onClick={() => {
								setPendingStatus("Rejected");
								setConfirmModalOpen(true);
							}}>
							Reject
						</Button>
					)}
				</div>
			</div>
			<Modal
				isOpen={confirmModalOpen}
				toggle={() => {
					setConfirmModalOpen(false);

					fetchBlog();
				}}
				centered>
				<ModalHeader toggle={() => setConfirmModalOpen(false)}>
					Confirm {pendingStatus} Blog
				</ModalHeader>
				<ModalBody>
					Are you sure you want to{" "}
					<strong>{pendingStatus?.toLowerCase()}</strong> this blog titled{" "}
					<strong>{selectedBlog?.title}</strong>?
				</ModalBody>
				<ModalFooter>
					<Button
						color='outline-primary'
						onClick={() => setConfirmModalOpen(false)}>
						Cancel
					</Button>
					<Button
						color={pendingStatus === "Approved" ? "success" : "danger"}
						onClick={async () => {
							if (selectedBlog && pendingStatus) {
								await handleApproval(selectedBlog._id, pendingStatus);
								setConfirmModalOpen(false);
							}
						}}>
						Yes, {pendingStatus}
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default BlogPage;

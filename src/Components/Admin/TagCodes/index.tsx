"use client";

import { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Label,
	Form,
	Row,
	Col,
	ButtonGroup,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import {
	getTagCodes,
	createTagCode,
	updateTagCode,
	deleteTagCode,
} from "@/app/api/admin/tag-codes";
import { Code, Edit2, Trash } from "react-feather";

const TagCodesContainer = () => {
	const [data, setData] = useState<any[]>([]);
	const [modal, setModal] = useState(false);
	const [selected, setSelected] = useState<any>(null);
	const [form, setForm] = useState({ title: "", code: "" });
	const [viewCodeModal, setViewCodeModal] = useState(false);
	const [viewedCode, setViewedCode] = useState("");

	const fetchData = async () => {
		try {
			const res = await getTagCodes();
			setData(res);
		} catch (error) {
			console.error(error);
			toast.error("Error fetching data");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async () => {
		try {
			if (selected) {
				await updateTagCode({ id: selected._id, data: form });
				toast.success("Tag updated successfully");
			} else {
				await createTagCode(form.code, form.title);
				toast.success("Tag created successfully");
			}
			setModal(false);
			setForm({ title: "", code: "" });
			setSelected(null);
			fetchData();
		} catch (error) {
			console.error(error);
			toast.error("Error saving tag");
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this tag?")) return;
		try {
			await deleteTagCode(id);
			toast.success("Tag deleted successfully");
			fetchData();
		} catch (error) {
			console.error(error);
			toast.error("Error deleting tag");
		}
	};

	const columns = [
		{
			name: "Title",
			selector: (row: any) => row.title,
			sortable: true,
		},
		{
			name: "Created",
			selector: (row: any) => new Date(row.createdAt).toLocaleDateString(),
			sortable: true,
			center: true,
		},
		{
			name: "Code",
			center: true,
			selector: (row: any) => row.code,
			sortable: true,
		},
		{
			name: "Actions",
			right: true,
			cell: (row: any) => (
				<div className='d-flex gap-2'>
					<ButtonGroup>
						<Button
							size='sm'
							className=' p-2 d-flex  align-items-center justify-content-center'
							style={{ width: "35px", height: "35px" }}
							color='primary'
							onClick={() => {
								setViewedCode(row.code);
								setViewCodeModal(true);
							}}>
							<Code size={16} />
						</Button>
						<Button
							size='sm'
							className=' p-2 d-flex  align-items-center justify-content-center'
							style={{ width: "35px", height: "35px" }}
							color='warning'
							onClick={() => {
								setSelected(row);
								setForm({ title: row.title, code: row.code });
								setModal(true);
							}}>
							<Edit2 size={16} />
						</Button>
						<Button
							size='sm'
							className=' p-2 d-flex  align-items-center justify-content-center'
							style={{ width: "35px", height: "35px" }}
							color='danger'
							onClick={() => handleDelete(row._id)}>
							<Trash size={16} />
						</Button>
					</ButtonGroup>
				</div>
			),
		},
	];

	return (
		<>
			<Breadcrumbs
				title='Tag Codes'
				parent='Admin'
				mainTitle='Tags'
			/>
			<div className='mb-3 text-end'>
				<Button
					color='success'
					onClick={() => {
						setSelected(null);
						setForm({ title: "", code: "" });
						setModal(true);
					}}>
					Add New Tag Code
				</Button>
			</div>
			<DataTable
				columns={columns}
				data={data}
				pagination
				striped
			/>

			{/* Add/Edit Modal */}
			<Modal
				isOpen={modal}
				toggle={() => setModal(!modal)}
				centered
				size='lg'>
				<ModalHeader toggle={() => setModal(!modal)}>
					{selected ? "Update Tag Code" : "Add New Tag Code"}
				</ModalHeader>
				<ModalBody>
					<Form>
						<Row>
							<Col md={12}>
								<Label>Title</Label>
								<Input
									type='text'
									value={form.title}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, title: e.target.value }))
									}
								/>
							</Col>
							<Col
								md={12}
								className='mt-3'>
								<Label>Tag Code</Label>
								<Input
									type='textarea'
									rows={6}
									value={form.code}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, code: e.target.value }))
									}
								/>
							</Col>
						</Row>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={handleSubmit}>
						{selected ? "Update" : "Create"}
					</Button>
					<Button
						color='outline-secondary'
						onClick={() => setModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			{/* View Code Modal */}
			<Modal
				isOpen={viewCodeModal}
				toggle={() => setViewCodeModal(false)}
				size='lg'
				centered>
				<ModalHeader toggle={() => setViewCodeModal(false)}>
					View Tag Code
				</ModalHeader>
				<ModalBody>
					<pre
						style={{
							background: "#f8f8f8",
							padding: "20px",
							borderRadius: "8px",
						}}>
						{viewedCode}
					</pre>
				</ModalBody>
			</Modal>
		</>
	);
};

export default TagCodesContainer;

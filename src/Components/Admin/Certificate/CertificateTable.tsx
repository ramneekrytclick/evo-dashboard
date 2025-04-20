"use client";

import { useEffect, useState } from "react";
import {
	getAllStudentsProgress,
	getAllCertificates,
	generateCertificate,
} from "@/app/api/admin/certificate";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import {
	Button,
	Spinner,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Label,
	Input,
} from "reactstrap";
import { getImageURL } from "@/CommonComponent/imageURL";
import { customTableStyles } from "../Batches/BatchesList";
const CertificateTable = () => {
	const [rows, setRows] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [certificates, setCertificates] = useState<any[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<any>(null);
	const [certificateFile, setCertificateFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isIssuing, setIsIssuing] = useState(false);

	const fetchData = async () => {
		try {
			const response = await getAllStudentsProgress();
			const students = response.students || [];
			const certRes = await getAllCertificates();
			const issuedCerts = certRes.certificates || [];
			setCertificates(issuedCerts);

			const flattened: any[] = [];
			students.forEach((student: any) => {
				(student.courses || []).forEach((course: any) => {
					const existingCert = issuedCerts.find(
						(cert: any) =>
							cert.student?._id === student.studentId &&
							cert.course?._id === course.courseId
					);

					flattened.push({
						studentId: student.studentId,
						name: student.name,
						email: student.email,
						courseId: course.courseId,
						courseTitle: course.title,
						progressPercent: course.progressPercent,
						completedLessons: course.completedLessons,
						totalLessons: course.totalLessons,
						isCourseComplete: course.isCourseComplete,
						certificateUrl: existingCert?.fileUrl || null,
					});
				});
			});

			setRows(flattened);
		} catch (error) {
			console.log(error);
			toast.error("Error fetching student progress");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setCertificateFile(file);
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		if (file) setPreviewUrl(URL.createObjectURL(file));
	};

	const handleIssueCertificate = async () => {
		if (!selectedRow || !certificateFile) {
			toast.error("Please upload a certificate file.");
			return;
		}
		try {
			setIsIssuing(true);
			const formData = new FormData();
			formData.append("studentId", selectedRow.studentId);
			formData.append("courseId", selectedRow.courseId);
			formData.append("certificate", certificateFile);
			await generateCertificate(formData);
			toast.success("Certificate issued successfully!");
			setModalOpen(false);
			setCertificateFile(null);
			setPreviewUrl(null);
			fetchData();
		} catch (err) {
			toast.error("Certificate issue failed");
		} finally {
			setIsIssuing(false);
		}
	};

	const columns = [
		{ name: "Name", selector: (row: any) => row.name, sortable: true },
		{ name: "Email", selector: (row: any) => row.email, wrap: true },
		{
			name: "Course Title",
			selector: (row: any) => row.courseTitle,
			wrap: true,
		},
		{
			name: "Lessons",
			selector: (row: any) => `${row.completedLessons}/${row.totalLessons}`,
			center: true,
		},
		{
			name: "Progress %",
			selector: (row: any) => `${row.progressPercent}%`,
			center: true,
		},
		{
			name: "Action",
			cell: (row: any) => {
				if (row.certificateUrl) {
					return (
						<Button
							color='success'
							size='sm'
							onClick={() => {
								setSelectedRow(row);
								setPreviewUrl(getImageURL(row.certificateUrl));
								setPreviewOpen(true);
							}}>
							View
						</Button>
					);
				}
				const eligible = row.progressPercent >= 70 && !row.isCourseComplete;
				return eligible ? (
					<Button
						color='primary'
						size='sm'
						onClick={() => {
							setSelectedRow(row);
							setModalOpen(true);
						}}>
						Issue
					</Button>
				) : (
					<span className='text-muted'>Not eligible till 70%</span>
				);
			},
			center: true,
		},
	];

	return (
		<div className='p-3'>
			{loading ? (
				<div className='text-center py-5'>
					<Spinner color='primary' />
				</div>
			) : (
				<DataTable
					columns={columns}
					data={rows}
					pagination
					highlightOnHover
					dense
					noDataComponent='No student progress found.'
					customStyles={customTableStyles}
				/>
			)}

			{/* Modal to upload certificate */}
			<Modal
				isOpen={modalOpen}
				toggle={() => setModalOpen(false)}>
				<ModalHeader toggle={() => setModalOpen(false)}>
					Generate Certificate for {selectedRow?.name}
				</ModalHeader>
				<ModalBody>
					<Label>Upload Certificate</Label>
					<Input
						type='file'
						accept='application/pdf,image/*'
						onChange={handleFileChange}
					/>
					{!certificateFile && (
						<small className='text-danger'>
							* Certificate file is required
						</small>
					)}
					{previewUrl && (
						<div className='mt-3'>
							<Label>Preview:</Label>
							{certificateFile?.type === "application/pdf" ? (
								<iframe
									src={previewUrl}
									width='100%'
									height='400px'
									title='PDF Preview'
								/>
							) : (
								<img
									src={previewUrl}
									alt='Certificate Preview'
									style={{ maxWidth: "100%", maxHeight: "400px" }}
								/>
							)}
						</div>
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={handleIssueCertificate}
						disabled={!certificateFile || isIssuing}>
						{isIssuing ? <Spinner size='sm' /> : "Give Certificate"}
					</Button>
					<Button
						color='primary-outline'
						onClick={() => setModalOpen(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			{/* View Certificate Modal */}
			<Modal
				isOpen={previewOpen}
				toggle={() => setPreviewOpen(false)}
				size='lg'>
				<ModalHeader toggle={() => setPreviewOpen(false)}>
					Certificate for {selectedRow?.name}
				</ModalHeader>
				<ModalBody>
					{previewUrl && previewUrl.endsWith(".pdf") ? (
						<iframe
							src={previewUrl}
							width='100%'
							height='500px'
							title='Certificate PDF'
						/>
					) : (
						<img
							src={previewUrl || ""}
							alt='Certificate'
							style={{ width: "100%" }}
						/>
					)}
				</ModalBody>
			</Modal>
		</div>
	);
};

export default CertificateTable;

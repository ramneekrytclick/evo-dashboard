"use client";

import { useEffect, useState } from "react";
import { getMyCertificates } from "@/app/api/student";
import { toast } from "react-toastify";
import { getImageURL } from "@/CommonComponent/imageURL";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Container, Spinner } from "reactstrap";
interface CerticateProps {
	_id: string;
	course: {
		_id: string;
		name?: string;
		title?: string;
	};
	student: string;
	fileUrl: string;
	issuedBy: string;
	createdAt: string;
	updatedAt: string;
}
const StudentCertificatesContainer = () => {
	const [certificates, setCertificates] = useState<CerticateProps[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchCertificates = async () => {
		try {
			const res = await getMyCertificates();
			setCertificates(res.certificates || []);
		} catch (error) {
			toast.error("Error fetching certificates");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCertificates();
	}, []);
	return (
		<>
			<Breadcrumbs
				mainTitle='Your Certificates'
				parent='Student'
				title='Your Certificates'
			/>
			<div className='px-3 py-4'>
				{loading ? (
					<Container className='d-flex gap-2 text-primary justify-content-center align-items-center'>
						<Spinner size={30} />
					</Container>
				) : certificates.length === 0 ? (
					<p className='text-muted'>No certificates found.</p>
				) : (
					<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
						{certificates.map((cert: CerticateProps) => (
							<div
								className='col'
								key={cert._id}>
								<div className='card shadow-sm h-100'>
									<div className='card-body d-flex flex-column justify-content-between'>
										<div>
											<p className='text-muted'>Certificate</p>
											<h5 className='card-title fw-semibold fs-2'>
												{cert.course.name || cert.course.title || "N/A"}
											</h5>
											<p className='card-text small text-muted'>
												Issued on:{" "}
												{new Date(cert.createdAt).toLocaleDateString()}
											</p>
										</div>

										<a
											href={getImageURL(cert.fileUrl)}
											target='_blank'
											rel='noopener noreferrer'
											className='btn btn-outline-primary mt-3'>
											View Certificate
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default StudentCertificatesContainer;

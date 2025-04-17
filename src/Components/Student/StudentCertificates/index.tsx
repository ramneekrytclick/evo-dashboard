"use client";

import { useEffect, useState } from "react";
import { getMyCertificates } from "@/app/api/student";
import { toast } from "react-toastify";
const backendURL = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const StudentCertificatesContainer = () => {
	const [certificates, setCertificates] = useState([]);
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
		<div className='container py-4'>
			<h4 className='fw-bold mb-4'>Your Certificates</h4>

			{loading ? (
				<p className='text-muted'>Loading certificates...</p>
			) : certificates.length === 0 ? (
				<p className='text-muted'>No certificates found.</p>
			) : (
				<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
					{certificates.map((cert: any) => (
						<div
							className='col'
							key={cert._id}>
							<div className='card shadow-sm h-100'>
								<div className='card-body d-flex flex-column justify-content-between'>
									<div>
										<h5 className='card-title text-primary'>
											{cert.course.title}
										</h5>
										<p className='card-text small text-muted'>
											Issued on: {new Date(cert.createdAt).toLocaleDateString()}
										</p>
									</div>
									<a
										href={`${backendURL}/uploads/${cert.fileUrl}`}
										target='_blank'
										rel='noopener noreferrer'
										className='btn btn-sm btn-outline-primary mt-3'>
										Download PDF
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default StudentCertificatesContainer;

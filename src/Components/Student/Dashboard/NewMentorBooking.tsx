"use client";
import { getMyBatches, getMyMentors } from "@/app/api/student";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Spinner } from "reactstrap";
import BookSessionForm from "../Batches/MyBatch/BookSessionForm";

const NewMentorBooking = () => {
	const [mentors, setMentors] = useState<any[]>([]);
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const [loading, setLoading] = useState(false);
	const fetchMentors = async () => {
		setLoading(true);
		try {
			const response = await getMyMentors();
			setMentors(response);
		} catch (error) {
			console.log(error);
			toast.error("Failed to load mentors");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchMentors();
	}, []);
	return (
		<>
			<Button
				color='primary'
				disabled={loading}
				onClick={() => {
					setModal(true);
				}}
				className='mt-2'>
				{loading ? (
					<Spinner size='sm' />
				) : (
					<span className='me-2'>
						Book
						<span className='fw-bold mx-2'>1:1</span>
						Mentor Session
					</span>
				)}
			</Button>
			{modal && (
				<BookSessionForm
					modalOpen={modal}
					toggle={toggle}
					allMentors={mentors}
				/>
			)}
		</>
	);
};

export default NewMentorBooking;

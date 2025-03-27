"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getWannaBeInterests } from "@/app/api/admin/wannabe";
import { assignWannaBeInterestToCourse } from "@/app/api/admin/course";

interface EditCourseFormProps {
	toggle: () => void;
	fetchData: () => void;
	id: string;
	wannaBeInterestId: string[];
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({
	toggle,
	fetchData,
	id,
	wannaBeInterestId,
}) => {
	const [wannaBeInterestIds, setWannaBeInterestIds] = useState<string[]>(
		wannaBeInterestId || []
	);
	const [wannaBeList, setWannaBeList] = useState<any[]>([]);

	useEffect(() => {
		const fetchInterests = async () => {
			try {
				const response = await getWannaBeInterests();
				setWannaBeList(response);
			} catch (error) {
				console.error("Failed to fetch WannaBeInterests:", error);
			}
		};

		fetchInterests();
	}, []);

	const handleCheckboxChange = (interestId: string) => {
		setWannaBeInterestIds((prev) =>
			prev.includes(interestId)
				? prev.filter((id) => id !== interestId)
				: [...prev, interestId]
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await assignWannaBeInterestToCourse(id, wannaBeInterestIds);
			toggle();
			fetchData();
		} catch (error) {
			console.error("Error updating course:", error);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label>Select Wanna Be Interests</Label>
				<div className="d-flex flex-column gap-2 mt-2">
					{wannaBeList.map((item) => (
						<Label
							check
							key={item._id}>
							<Input
								type="checkbox"
								value={item._id}
								checked={wannaBeInterestIds.includes(item._id)}
								onChange={() => handleCheckboxChange(item._id)}
							/>{" "}
							{item.title}
						</Label>
					))}
				</div>
			</FormGroup>
			<Button
				color="primary"
				type="submit">
				Update
			</Button>
		</Form>
	);
};

export default EditCourseForm;

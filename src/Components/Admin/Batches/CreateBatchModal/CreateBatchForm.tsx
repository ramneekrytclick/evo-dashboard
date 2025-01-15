import { createBatch } from "@/app/api/admin/batches";
import { BatchProps } from "@/Types/Course.type";
import { StudentProps } from "@/Types/Student.type";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

interface CreateBatchFormProps {
	toggle: () => void;
	fetchData: () => Promise<void>;
}

const CreateBatchForm = ({ toggle, fetchData }: CreateBatchFormProps) => {
	const [formData, setFormData] = useState<BatchProps>({
		_id: "", // This can be omitted as it might be auto-generated
		batchStatus: "",
		name: "",
		courseId: "",
		startDate: "",
		endDate: "",
		capacity: 0,
		students: [],
		mentors: [],
		promoCodes: [],
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await createBatch(formData);
			console.log(response);
			toast("Batch created successfully!");
			fetchData();
			toggle();
		} catch (error) {
			console.error(error);
			toast.error("Error creating batch!");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row className="g-3">
				<Col md={12}>
					<Label htmlFor="name">Batch Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter batch name"
						required
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="batchStatus">Batch Status</Label>
					<Input
						id="batchStatus"
						name="batchStatus"
						type="text"
						value={formData.batchStatus}
						onChange={handleChange}
						placeholder="Enter batch status"
						required
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="courseId">Course ID</Label>
					<Input
						id="courseId"
						name="courseId"
						type="text"
						value={formData.courseId}
						onChange={handleChange}
						placeholder="Enter course ID"
						required
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="startDate">Start Date</Label>
					<Input
						id="startDate"
						name="startDate"
						type="date"
						value={formData.startDate}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="endDate">End Date</Label>
					<Input
						id="endDate"
						name="endDate"
						type="date"
						value={formData.endDate}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col md={12}>
					<Label htmlFor="capacity">Capacity</Label>
					<Input
						id="capacity"
						name="capacity"
						type="number"
						value={formData.capacity}
						onChange={handleChange}
						placeholder="Enter batch capacity"
						required
					/>
				</Col>
				<Col md={12}>
					<Button color="primary" type="submit">
						Create Batch
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateBatchForm;

"use client";
import {
	Button,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { useEffect, useState } from "react";
import { Subcategory } from "@/Types/Category.type";
import { getSubcategories } from "@/app/api/admin/subcategories";
import { toast } from "react-toastify";

const UpdateCourseModal = ({
	isOpen,
	toggle,
	course,
	categories,
	wannabe,
	onSave,
}: any) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		whatYouWillLearn: "",
		youtubeLink: "",
		timing: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterestIds: [] as string[],
		realPrice: "",
		discountedPrice: "",
		tags: "",
	});

	const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

	useEffect(() => {
		if (course) {
			setFormData({
				title: course.title || "",
				description: course.description || "",
				whatYouWillLearn: course.whatYouWillLearn || "",
				youtubeLink: course.youtubeLink || "",
				timing: course.timing || "",
				categoryId: "",
				subcategoryId: "",
				wannaBeInterestIds: course.interest
					? course.interest.split(",").filter((i: string) => i !== "N/A")
					: [],
				realPrice: course.realPrice?.toString() || "",
				discountedPrice: course.discountedPrice?.toString() || "",
				tags: course.tags || "",
			});
		}
	}, [course]);

	useEffect(() => {
		if (formData.categoryId !== "") {
			(async () => {
				const response = await getSubcategories(formData.categoryId);
				setSubcategories(response);
			})();
		}
	}, [formData.categoryId]);

	const handleChange = (key: string, value: any) =>
		setFormData((prev) => ({ ...prev, [key]: value }));

	const toggleInterest = (id: string) => {
		setFormData((prev) => ({
			...prev,
			wannaBeInterestIds: prev.wannaBeInterestIds.includes(id)
				? prev.wannaBeInterestIds.filter((i) => i !== id)
				: [...prev.wannaBeInterestIds, id],
		}));
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered>
			<ModalHeader toggle={toggle}>Update Course</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label>Title</Label>
					<Input
						value={formData.title}
						onChange={(e) => handleChange("title", e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label>Description</Label>
					<Input
						type='textarea'
						value={formData.description}
						onChange={(e) => handleChange("description", e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label>What You Will Learn</Label>
					<Input
						type='textarea'
						value={formData.whatYouWillLearn}
						onChange={(e) => handleChange("whatYouWillLearn", e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label>YouTube Link</Label>
					<Input
						value={formData.youtubeLink}
						onChange={(e) => handleChange("youtubeLink", e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label>Timing</Label>
					<Input
						value={formData.timing}
						onChange={(e) => handleChange("timing", e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label>Category</Label>
					<Input
						type='select'
						value={formData.categoryId}
						onChange={(e) => {
							handleChange("categoryId", e.target.value);
							handleChange("subcategoryId", "");
						}}>
						<option value=''>Select Category</option>
						{categories.map((cat: any) => (
							<option
								key={cat._id}
								value={cat._id}>
								{cat.title}
							</option>
						))}
					</Input>
				</FormGroup>

				<FormGroup>
					<Label>Subcategory</Label>
					<Input
						type='select'
						value={formData.subcategoryId}
						onChange={(e) => handleChange("subcategoryId", e.target.value)}>
						<option value=''>Select Subcategory</option>
						{subcategories.map((sub: any) => (
							<option
								key={sub._id}
								value={sub._id}>
								{sub.title}
							</option>
						))}
					</Input>
				</FormGroup>

				<FormGroup>
					<Label>WannaBe Interests</Label>
					<div className='d-flex flex-wrap gap-2'>
						{wannabe.map((w: any) => (
							<FormGroup
								check
								key={w._id}>
								<Label check>
									<Input
										type='checkbox'
										checked={formData.wannaBeInterestIds.includes(w._id)}
										onChange={() => toggleInterest(w._id)}
									/>{" "}
									{w.title}
								</Label>
							</FormGroup>
						))}
					</div>
				</FormGroup>

				<FormGroup>
					<Label>Real Price</Label>
					<Input
						type='number'
						value={formData.realPrice}
						onChange={(e) => handleChange("realPrice", e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label>Discounted Price</Label>
					<Input
						type='number'
						value={formData.discountedPrice}
						onChange={(e) => handleChange("discountedPrice", e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label>Tags (comma separated)</Label>
					<Input
						value={formData.tags}
						onChange={(e) => handleChange("tags", e.target.value)}
					/>
				</FormGroup>
			</ModalBody>

			<ModalFooter>
				<Button
					color='secondary'
					onClick={toggle}>
					Cancel
				</Button>
				<Button
					color='success'
					onClick={() => onSave(formData)}>
					Save Changes
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default UpdateCourseModal;

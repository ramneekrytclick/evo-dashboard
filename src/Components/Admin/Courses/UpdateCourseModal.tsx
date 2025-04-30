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
import { getSubcategories } from "@/app/api/admin/subcategories";
import { toast } from "react-toastify";
import Select from "react-select";

const UpdateCourseModal = ({
	isOpen,
	toggle,
	course,
	categories,
	wannabe,
	onSave,
}: any) => {
	const [formData, setFormData] = useState<any>({
		title: "",
		description: "",
		whatYouWillLearn: "",
		youtubeLink: "",
		timing: "",
		categoryId: "",
		subcategoryId: "",
		wannaBeInterestIds: [],
		realPrice: "",
		discountedPrice: "",
		tags: "",
		createdBy: "",
		photo: null,
	});

	const [subcategories, setSubcategories] = useState<any[]>([]);

	useEffect(() => {
		if (course) {
			setFormData({
				title: course.title || "",
				description: course.description || "",
				whatYouWillLearn: course.whatYouWillLearn || "",
				youtubeLink: course.youtubeLink || "",
				timing: course.timing || "",
				categoryId: course.category?._id || course.category || "",
				subcategoryId: course.subcategory?._id || course.subcategory || "",
				wannaBeInterestIds: Array.isArray(course.wannaBeInterest)
					? course.wannaBeInterest.map((w: any) => w?._id || w)
					: [],
				realPrice: course.realPrice || "",
				discountedPrice: course.discountedPrice || "",
				tags: Array.isArray(course.tags)
					? course.tags.join(", ")
					: course.tags || "",
				createdBy: course.createdBy || "",
				photo: null,
			});
		}
	}, [course]);

	// ✅ Fix subcategories not loading: actually invoke the async function
	useEffect(() => {
		const fetchSubs = async () => {
			try {
				if (formData.categoryId) {
					const res = await getSubcategories(formData.categoryId);
					setSubcategories(res);
				}
			} catch (error) {
				console.log("Error fetching subcategories:", error);
			}
		};
		fetchSubs();
	}, [formData.categoryId]);

	const handleChange = (key: string, value: any) => {
		setFormData((prev: any) => ({ ...prev, [key]: value }));
	};

	const interestOptions = wannabe.map((w: any) => ({
		label: w.title,
		value: w._id,
	}));

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			centered>
			<ModalHeader toggle={toggle}>Update Course</ModalHeader>
			<ModalBody style={{ maxHeight: "80vh", overflowY: "auto" }}>
				<FormGroup>
					<Label>Title</Label>
					<Input
						type='text'
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
					<Select
						isMulti
						options={interestOptions}
						value={interestOptions.filter((i: any) =>
							formData.wannaBeInterestIds.includes(i.value)
						)}
						onChange={(selected) =>
							handleChange(
								"wannaBeInterestIds",
								selected.map((s) => s.value)
							)
						}
					/>
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
						type='text'
						value={formData.tags}
						onChange={(e) => handleChange("tags", e.target.value)}
					/>
				</FormGroup>

				{/* <FormGroup>
					<Label>Course Image (optional)</Label>
					<Input
						type='file'
						onChange={(e) => handleChange("photo", e.target.files?.[0])}
					/>
				</FormGroup> */}
			</ModalBody>
			<ModalFooter>
				<Button
					color='outline-success'
					onClick={toggle}>
					Cancel
				</Button>
				<Button
					color='success'
					onClick={() => onSave(formData)}>
					Update
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default UpdateCourseModal;

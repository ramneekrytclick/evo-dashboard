import CommonModal from "@/CommonComponent/CommonModal";
import { updateLessonTitle } from "@/Constant";
import { Edit } from "react-feather";
import { Button, ButtonGroup } from "reactstrap";
import UpdateLessonForm from "./UpdateLessonForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LessonFormProps } from "@/Types/Lesson.type";

const UpdateLessonModal = ({
	fetchData,
	values,
	courseId
}: {
	values: LessonFormProps;
	fetchData: () => Promise<void>;
	courseId: string;
}) => {
	const [modal, setModal] = useState(false);
	const router = useRouter();
	const toggle = () => {
		setModal(!modal);
	};
	const ModalData = {
		isOpen: modal,
		toggler: toggle,
		bodyClass: "dark-sign-up social-profile text-start",
	};

	return (
		<>
			<ButtonGroup>
				{/* <Button color="primary">View Lessons</Button> */}
				<Button
					color="dark"
					onClick={toggle}>
					<Edit size={20} />
				</Button>
			</ButtonGroup>
			<CommonModal modalData={ModalData}>
				<div className="modal-toggle-wrapper">
					<h3 className="mb-3">{updateLessonTitle}</h3>
					<UpdateLessonForm
						toggle={toggle}
						values={values}
						fetchData={fetchData}
						courseId={courseId}
					/>
				</div>
			</CommonModal>
		</>
	);
};

export default UpdateLessonModal;

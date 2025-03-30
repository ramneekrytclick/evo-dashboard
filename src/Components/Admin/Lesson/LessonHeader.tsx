import { AddCourseTitle, AddLessonTitle } from "@/Constant";
import Link from "next/link";

const LessonHeader = () => {
	return (
		<div className="list-product-header">
			<div>
				<Link
					className="btn btn-primary"
					href={"/admin/create-lesson"}>
					<i className="fa fa-plus me-2 py-1" /> {AddLessonTitle}
				</Link>
			</div>
		</div>
	);
};

export default LessonHeader;

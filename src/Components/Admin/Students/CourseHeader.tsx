import { AddCourseTitle } from "@/Constant";
import Link from "next/link";

const CourseHeader = () => {
	return (
		<div className="list-product-header">
			<div>
				<Link
					className="btn btn-primary"
					href={"/admin/create-course"}>
					<i className="fa fa-plus me-2 py-1" /> {AddCourseTitle}
				</Link>
			</div>
		</div>
	);
};

export default CourseHeader;

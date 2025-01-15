import { AddPathTitle } from "@/Constant";
import Link from "next/link";

const PathsHeader = () => {
	return (
		<div className="list-product-header">
			<div>
				<Link
					className="btn btn-primary"
					href={"/admin/paths/create-path"}>
					<i className="fa fa-plus me-2 py-1" /> {AddPathTitle}
				</Link>
			</div>
		</div>
	);
};

export default PathsHeader;

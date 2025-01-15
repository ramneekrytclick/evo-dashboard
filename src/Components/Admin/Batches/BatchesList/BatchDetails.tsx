import { Dollar } from "@/Constant";
import { BatchProps } from "@/Types/Course.type";
import Link from "next/link";
import { Badge } from "reactstrap";

const BatchDetails = ({ batch }: { batch: BatchProps }) => {
	return (
		<div className="product-details bg-light">
			<Link href={`/admin/batches`}>
				<h4>{batch.name}</h4>
			</Link>
			<p className="text-primary">{JSON.stringify(batch.courseId)}</p>
			<Badge
				className="py-1 my-1 text-light"
				color={`${batch.batchStatus == "Active" ? "success" : "danger"}`}>
				{batch.batchStatus}
			</Badge>
			<div className="product-price">
				{new Date(batch.startDate).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
				-{" "}
				{new Date(batch.endDate).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</div>
		</div>
	);
};

export default BatchDetails;

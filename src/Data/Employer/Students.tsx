import { StudentProps } from "@/Types/Student.type";
import { TableColumn } from "react-data-table-component";
import { Button } from "reactstrap";

export const studentTableColumns: TableColumn<StudentProps>[] = [
	{
		name: "Name",
		selector: (row: any) => row.name || "N/A",
		sortable: true,
	},
	{
		name: "Email",
		selector: (row: any) => row.email || "N/A",
		sortable: true,
	},
	{
		name: "Phone",
		selector: (row: any) => row.resume?.personalDetails?.phone || "N/A",
		sortable: true,
	},
	{
		name: "Education",
		selector: (row: any) =>
			row.resume?.education?.length > 0
				? row.resume.education
						.map(
							(edu: any) => `${edu.degree} (${edu.institution}, ${edu.year})`
						)
						.join("; ")
				: "None",
	},
	{
		name: "Experience",
		selector: (row: any) =>
			row.resume?.experience?.length > 0
				? row.resume.experience
						.map(
							(exp: any) => `${exp.role} at ${exp.company} (${exp.duration} years)`
						)
						.join("; ")
				: "None",
	},
	{
		name: "Skills",
		selector: (row: any) =>
			row.resume?.skills?.length > 0 ? row.resume.skills.join(", ") : "None",
	},
	// {
	// 	name: "Action",
	// 	cell: (row: any) => (
	// 		<div className="d-flex gap-2">
	// 			<Button size="sm" color="primary">
	// 				View
	// 			</Button>
	// 		</div>
	// 	),
	// },
];
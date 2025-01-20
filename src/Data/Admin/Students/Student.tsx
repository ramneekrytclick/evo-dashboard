import { StudentProps } from "@/Types/Student.type";
import { TableColumn } from "react-data-table-component";
import { Badge, Button } from "reactstrap";

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
		name: "Evo Score",
		selector: (row: any) => row.evoScore || 0,
		sortable: true,
		cell: (row: any) => {
			return (
				<span className="text-center  w-100 py-1">
				<span className="text-center text-primary fw-bolder rounded-3 px-2 py-1">
					{row.evoScore}
					</span>
				</span>
			);
		},
	},
	// {
	// 	name: "Status",
	// 	selector: (row: any) => (
	// 		<Badge className="py-1" color={row.status === "Approved" ? "success" : "danger"}>
	// 			{row.status || "N/A"}
	// 		</Badge>
	// 	),
	// 	sortable: true,
	// },
	{
		name: "Languages Preferred",
		selector: (row: any) =>
			row.languagesPreferred?.length > 0
				? row.languagesPreferred.join(", ")
				: "None",
	},
	{
		name: "Interests",
		selector: (row: any) =>
			row.interests?.length > 0 ? row.interests.join(", ") : "None",
	},
	{
		name: "Progress (Overall)",
		selector: (row: any) =>
			row.progressTracking?.overallProgress
				? `${row.progressTracking.overallProgress}%`
				: "0%",
		sortable: true,
	},
	{
		name: "Resume Skills",
		selector: (row: any) =>
			row.resume?.skills?.length > 0 ? row.resume.skills.join(", ") : "None",
	},
	{
		name: "Action",
	},
];

export const studentFilterOptions = [
	{
		name: "Name",
		options: [], // Placeholder for dynamic filtering
	},
	{
		name: "Email Domain",
		options: ["@gmail.com", "@yahoo.com", "@outlook.com", "@company.com"],
	},
	{
		name: "Education",
		options: ["High School", "Bachelor's", "Master's", "PhD"],
	},
	{
		name: "Courses Enrolled",
		options: [
			"Web Development",
			"Data Science",
			"Machine Learning",
			"UI/UX Design",
		],
	},
	{
		name: "Interests",
		options: ["Technology", "Art", "Finance", "Health", "Science"],
	},
	{
		name: "Languages Preferred",
		options: ["English", "Hindi", "Spanish", "French", "Mandarin"],
	},
	{
		name: "Wanna Be",
		options: ["Developer", "Data Scientist", "Designer", "Entrepreneur"],
	},
	{
		name: "Batch",
		options: ["Batch A", "Batch B", "Batch C", "Batch D"],
	},
	{
		name: "Roadmap Enrolled",
		options: ["Frontend", "Backend", "Full Stack", "Data Engineering"],
	},
	{
		name: "Status",
		options: ["Active", "Inactive", "On Hold"],
	},
];

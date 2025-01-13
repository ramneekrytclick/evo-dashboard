import { MentorDataProps } from "@/Types/Mentor.type";
import { TableColumn } from "react-data-table-component";

export const mentorTableColumns: TableColumn<MentorDataProps>[] = [
	{
		name: "Name",
		selector: (row) => row.name,
		sortable: true,
		center: false,
	},
	{
		name: "Email",
		selector: (row) => row.email,
		sortable: true,
		center: false,
	},
	{
		name: "Status",
		selector: (row) => row.status,
		sortable: true,
		center: false,
	},
	{
		name: "Education",
		cell: (row) => (
			<ul>
				{row.education.map((edu, index) => (
					<li key={index}>
						{edu.degree} from {edu.institute} ({edu.year})
					</li>
				))}
			</ul>
		),
		sortable: true,
		center: false,
	},
	{
		name: "Languages Preferred",
		selector: (row) => row.languagesPreferred.join(", "), // Convert the array to a comma-separated string
		sortable: true,
		center: false,
	},
	{
		name: "Resume Skills",
		selector: (row) => row.resume.skills.join(", "), // Convert the skills array to a string
		sortable: true,
		center: false,
	},
	{
		name: "Progress",
		selector: (row) =>
			`${row.progressTracking.overallProgress}% (${row.progressTracking.completedCourses.length} completed)`,
		sortable: true,
		center: false,
	},
	{
		name: "Action",
		sortable: false,
		center: false,
	},
];

export const mentorFilterOptions = [
	{
		name: "Name",
		options: [], // Placeholder for dynamic filtering or typeahead search
	},
	{
		name: "Username",
		options: [], // Placeholder for dynamic filtering or typeahead search
	},
	{
		name: "Education",
		options: ["B.Tech", "M.Tech", "MBA", "PhD", "B.Sc", "M.Sc"],
	},
	{
		name: "Assigned Courses",
		options: [
			"Web Development",
			"Data Science",
			"Machine Learning",
			"Cybersecurity",
		],
	},
	{
		name: "Batch Assignments",
		options: ["Batch A", "Batch B", "Batch C", "Batch D"],
	},
	{
		name: "Time Availability",
		options: ["Morning", "Afternoon", "Evening", "Full-Day"],
	},
	{
		name: "Category Expertise",
		options: ["Technology", "Finance", "Design", "Health", "Social Science"],
	},
	{
		name: "Status",
		options: ["Active", "Inactive", "On Leave"],
	},
	{
		name: "Contact Number",
		options: [], // Placeholder for dynamic filtering
	},
	{
		name: "Email Domain",
		options: ["@gmail.com", "@yahoo.com", "@outlook.com", "@company.com"],
	},
];

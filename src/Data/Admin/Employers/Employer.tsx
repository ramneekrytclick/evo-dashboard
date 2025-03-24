import { TableColumn } from "react-data-table-component";

export const addEmployerNav = [
	{
		id: 1,
		icon: "employer-details",
		title: "Add Employer Details",
		subTitle: "Add employer name & industry",
	},
	{
		id: 2,
		icon: "company-info",
		title: "Company Info",
		subTitle: "Add company size & address",
	},
	{
		id: 3,
		icon: "contact",
		title: "Contact Details",
		subTitle: "Add contact number & email",
	},
];

export const employerFilterOptions = [
	{
		name: "Industry",
		options: [
			"Technology",
			"Finance",
			"Healthcare",
			"Education",
			"Real Estate",
			"Retail",
			"Manufacturing",
			"Hospitality",
		],
	},
	{
		name: "Company Size",
		options: [
			"1-10 Employees",
			"11-50 Employees",
			"51-200 Employees",
			"201-500 Employees",
			"501-1000 Employees",
			"1001+ Employees",
		],
	},
	{
		name: "Location",
		options: [
			"United States",
			"Canada",
			"United Kingdom",
			"Australia",
			"India",
			"Germany",
			"France",
			"Japan",
		],
	},
	{
		name: "Status",
		options: ["Active", "Inactive", "Pending Approval"],
	},
];

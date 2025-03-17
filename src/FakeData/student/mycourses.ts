import { CourseProps } from "@/Types/Course.type";

export const enrolledCourses = [
	{
		_id: "1",
		name: "Course 1",
		category: "Marketing",
		subcategory: "Cloud Computing",
		description: "Comprehensive training on Cloud Computing.",
		duration: "7 weeks",
		mentorAssigned: {
			name: "Mentor 1",
			id: "bebd64b7-a61b-4721-97dc-a8dabf1504eb",
			email: "mentor1@example.com",
		},
		managerAssigned: {
			name: "Manager 1",
			id: "e559242d-5ccd-4f1b-8bdd-2dd93aeaadaf",
			email: "manager1@example.com",
		},
		batchesAvailable: [
			"189b26fb-afda-464f-b4bf-03540020248f",
			"1a1d0602-2095-4957-9bed-c3a5dd305b24",
		],
		promoCodes: [
			{
				code: "DISCOUNT10",
				discount: 10,
			},
			{
				code: "OFFER20",
				discount: 20,
			},
		],
		price: 12662,
	},
	{
		_id: "2",
		name: "Course 2",
		category: "Cybersecurity",
		subcategory: "Cloud Computing",
		description: "Comprehensive training on Mobile Development.",
		duration: "4 weeks",
		mentorAssigned: {
			name: "Mentor 0",
			id: "68f265f9-abd3-4b4a-9456-2b20879c8d17",
			email: "mentor0@example.com",
		},
		managerAssigned: {
			name: "Manager 2",
			id: "674acc06-711e-4a03-967c-1126f4f3cf3a",
			email: "manager2@example.com",
		},
		batchesAvailable: [
			"e639832c-dd4d-4dd2-af44-9cfb54a23f55",
			"51870d33-0588-4ebb-92a8-3b2c27b88a63",
			"0057b5a7-ca79-4eb6-babc-00d8586da662",
		],
		promoCodes: [
			{
				code: "DISCOUNT10",
				discount: 10,
			},
			{
				code: "OFFER20",
				discount: 20,
			},
		],
		price: 29539,
	},
	{
		_id: "3",
		name: "Course 3",
		category: "Design",
		subcategory: "AI & ML",
		description: "Comprehensive training on Blockchain.",
		duration: "10 weeks",
		mentorAssigned: {
			name: "Mentor 1",
			id: "bebd64b7-a61b-4721-97dc-a8dabf1504eb",
			email: "mentor1@example.com",
		},
		managerAssigned: {
			name: "Manager 1",
			id: "e559242d-5ccd-4f1b-8bdd-2dd93aeaadaf",
			email: "manager1@example.com",
		},
		batchesAvailable: [
			"de03c556-1145-4fd9-ae35-e7cb6aec81c5",
			"18d309e5-8dd0-4f4e-af3b-9fb1a91620d9",
			"ddc6fc9a-4bf5-4bc6-8ae4-30f85f213e4e",
		],
		promoCodes: [
			{
				code: "DISCOUNT10",
				discount: 10,
			},
			{
				code: "OFFER20",
				discount: 20,
			},
		],
		price: 29902,
	},
	{
		_id: "4",
		name: "Course 4",
		category: "Business",
		subcategory: "Web Development",
		description: "Comprehensive training on Cloud Computing.",
		duration: "11 weeks",
		mentorAssigned: {
			name: "Mentor 2",
			id: "92d9bc4b-521b-4593-a739-491bbe6aa8d7",
			email: "mentor2@example.com",
		},
		managerAssigned: {
			name: "Manager 0",
			id: "42e00d8c-2504-498d-b0b6-0c7f3106e807",
			email: "manager0@example.com",
		},
		batchesAvailable: [
			"4124bd37-5c76-4bdb-8b0f-b60540490e3a",
			"e96952bb-b2c9-4d23-9489-b1ee02612ae0",
		],
		promoCodes: [
			{
				code: "DISCOUNT10",
				discount: 10,
			},
			{
				code: "OFFER20",
				discount: 20,
			},
		],
		price: 26794,
	},
	{
		_id: "2",
		name: "Course 5",
		category: "Technology",
		subcategory: "AI & ML",
		description: "Comprehensive training on AI & ML.",
		duration: "7 weeks",
		mentorAssigned: {
			name: "Mentor 3",
			id: "7c36d7a4-5294-45d2-b36b-e726f0541832",
			email: "mentor3@example.com",
		},
		managerAssigned: {
			name: "Manager 2",
			id: "674acc06-711e-4a03-967c-1126f4f3cf3a",
			email: "manager2@example.com",
		},
		batchesAvailable: ["23024cbc-984b-43bc-9b36-31e7ed840e0c"],
		promoCodes: [
			{
				code: "DISCOUNT10",
				discount: 10,
			},
			{
				code: "OFFER20",
				discount: 20,
			},
		],
		price: 20530,
	},
];

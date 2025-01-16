import { MenuItem } from "@/Types/Layout.type";

export const MenuList: MenuItem[] | undefined = [
	{
		title: "Admin",
		lanClass: "lan-1",
		menucontent:
			"Dashboard, Users, Courses,Content Approval, Job Portal, Announcements, ",
		Items: [
			{
				path: "/admin/dashboard",
				id: 1,
				icon: "home",
				title: "Dashboard",
				type: "link",
			},
			{
				title: "Team",
				id: 2,
				icon: "user",
				type: "link",
				path: "/admin/team",
			},
			{
				title: "Mentors",
				id: 4,
				icon: "user",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/mentors",
			},
			{
				title: "Students",
				id: 5,
				icon: "user",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/students",
			},
			{
				title: "Employers",
				id: 6,
				icon: "learning",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/employers",
			},
			{
				title: "Courses",
				id: 7,
				icon: "to-do",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/courses",
			},
			{
				title: "Create Lesson",
				id: 10,
				icon: "layout",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/create-lesson",
			},
			{
				title: "Batches",
				id: 11,
				icon: "calendar",
				type: "link",
				path: "/admin/batches",
			},
			{
				title: "Create Path",
				icon: "maps",
				id: 12,
				type: "link",
				path: "/admin/paths/create-path",
			},
			{
				id: 8,
				title: "Categories",
				icon: "widget",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/categories",
			},
			{
				id: 9,
				path: "/admin/blog-approval",
				icon: "table",
				title: "Blog Approval",
				type: "link",
			},

			{
				path: "/admin/announcements",
				icon: "faq",
				title: "Announcements",
				type: "link",
			},
			{
				path: "/admin/promo-codes",
				icon: "others",
				title: "Promo Codes",
				type: "link",
			},
		],
	},
	{
		title: "Creator",
		lanClass: "lan-1",
		Items: [
			{
				id: 1,
				path: "/creator/dashboard",
				icon: "home",
				title: "Dashboard",
				type: "link",
			},
			{
				id: 2,
				path: "/creator/create-blog",
				icon: "to-do",
				title: "Create Blog",
			},
			{
				id: 3,
				path: "/creator/my-blogs",
				icon: "ui-kits",
				title: "Get My Blogs",
			},
		],
	},
	{
		title: "Employer",
		lanClass: "lan-1",
		Items: [
			{
				id: 1,
				path: "/employer/dashboard",
				icon: "home",
				title: "Dashboard",
				type: "link",
			},
			{
				id: 2,
				path: "/employer/create-job",
				icon: "form",
				title: "Create Job",
			},
			{
				id: 3,
				path: "/employer/students",
				icon: "user",
				title: "Students",
			},
			{
				id: 4,
				path: "/employer/jobs",
				icon: "ui-kits",
				title: "Job Applications",
			}
		],
	},
];

// {
// 	title: "Job Portal",
// 	id: 5,
// 	icon: "learning",
// 	type: "sub",
// 	lanClass: "lan-8",
// 	children: [
// 		{
// 			path: "/admin/employer",
// 			title: "Employers",
// 			type: "link",
// 			lanClass: "lan-9",
// 		},
// 		{
// 			path: "/admin/job-approval",
// 			title: "Job Campaigns",
// 			type: "link",
// 			lanClass: "lan-9",
// 		},
// 	],
// },

// {
// 	path: "/paths",
// 	icon: "button",
// 	title: "Paths & Roadmaps",
// 	type: "link",
// },
// {
// 	path: "/analytics",
// 	icon: "charts",
// 	title: "Analytics",
// 	type: "link",
// },
// {
// 	path: "/tickets",
// 	icon: "support-tickets",
// 	title: "Tickets & Feedback",
// 	type: "link",
// },
// {
// 	path: "/logs",
// 	icon: "to-do",
// 	title: "Logs & Activity",
// 	type: "link",
// },
// {
// 	path: "/settings",
// 	icon: "knowledgebase",
// 	title: "Settings",
// 	type: "link",
// },

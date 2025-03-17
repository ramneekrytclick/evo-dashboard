import { MenuItem } from "@/Types/Layout.type";

export const SupportMenuList: MenuItem = {
	title: "Support",
	Items: [
		{
			id: 1,
			path: "/support/tickets",
			icon: "ticket",
			title: "My Tickets",
			type: "link",
		},
	],
};
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
				title: "Paths",
				icon: "maps",
				id: 12,
				type: "link",
				path: "/admin/paths",
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
			{
				path: "/admin/support/tickets",
				icon: "support-tickets",
				title: "Support",
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
			{
				path: "/creator/support/tickets",
				icon: "support-tickets",
				title: "Support",
				type: "link",
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
			},
			{
				path: "/employer/support/tickets",
				icon: "support-tickets",
				title: "Support",
				type: "link",
			},
		],
	},
	{
		title: "Mentor",
		lanClass: "lan-1",
		Items: [
			{
				id: 1,
				path: "/mentor/dashboard",
				icon: "home",
				title: "Dashboard",
				type: "link",
			},
			{
				id: 2,
				path: "/mentor/schedule-session",
				icon: "calendar",
				title: "Schedule Session",
			},
			{
				id: 3,
				path: "/mentor/add-assignment",
				icon: "form",
				title: "Add Assignment",
			},
			{
				id: 4,
				path: "/mentor/assignments",
				icon: "layout",
				title: "Assignments",
			},
			{
				path: "/mentor/support/tickets",
				icon: "support-tickets",
				title: "Support",
				type: "link",
			},
		],
	},
	{
		title: "Student",
		lanClass: "lan-1",
		Items: [
			{
				id: 1,
				path: "/student/dashboard",
				icon: "home",
				title: "Dashboard",
				type: "link",
			},
			{
				id: 2,
				path: "/student/my-courses",
				icon: "calendar",
				title: "My Courses",
			},
			{
				id: 3,
				path: "/student/paths",
				icon: "maps",
				title: "Enrolled Paths",
			},
			{
				id: 4,
				path: "/student/batches",
				icon: "learning",
				title: "Batches",
			},
			{
				id: 4,
				path: "/student/resume",
				icon: "layout",
				title: "Resume",
			},
			{
				path: "/student/support/tickets",
				icon: "support-tickets",
				title: "Support",
				type: "link",
			},
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

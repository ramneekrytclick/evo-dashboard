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
				title: "Courses",
				id: 3,
				icon: "learning",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/courses",
			},
			{
				title:"Mentors",
				id: 4,
				icon: "user",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/mentors",
			},
			{
				title:"Students",
				id: 5,
				icon: "user",
				type: "link",
				lanClass: "lan-6",
				path: "/admin/students",
			},
			{
				path: "/content-approval",
				icon: "table",
				title: "Content Approval",
				type: "link",
			},
			{
				title: "Job Portal",
				id: 4,
				icon: "learning",
				type: "sub",
				lanClass: "lan-8",
				children: [
					{
						path: "/jobs/employers",
						title: "Employers",
						type: "link",
						lanClass: "lan-9",
					},
					{
						path: "/jobs/campaigns",
						title: "Job Campaigns",
						type: "link",
						lanClass: "lan-9",
					},
				],
			},
			{
				path: "/announcements",
				icon: "faq",
				title: "Announcements",
				type: "link",
			},
			{
				path: "/promo-codes",
				icon: "others",
				title: "Promo Codes",
				type: "link",
			},
			{
				path: "/paths",
				icon: "button",
				title: "Paths & Roadmaps",
				type: "link",
			},
			{
				path: "/analytics",
				icon: "charts",
				title: "Analytics",
				type: "link",
			},
			{
				path: "/tickets",
				icon: "support-tickets",
				title: "Tickets & Feedback",
				type: "link",
			},
			{
				path: "/logs",
				icon: "to-do",
				title: "Logs & Activity",
				type: "link",
			},
			{
				path: "/settings",
				icon: "knowledgebase",
				title: "Settings",
				type: "link",
			},
		],
	}
];

"use client";
import { useAppSelector } from "@/Redux/Hooks";
import { Fragment, useState } from "react";
import { MenuList } from "@/Data/Layout/Menu";
import { MenuItem } from "@/Types/Layout.type";
import Menulist from "./Menulist";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/app/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "reactstrap";

const SidebarMenuList = () => {
	const [activeMenu, setActiveMenu] = useState([]);
	const { pinedMenu } = useAppSelector((state) => state.layout);
	const pathname = usePathname();
	const { t } = useTranslation("common");
	// const { role } = useAuth(); // Retrieve user role from the auth provider.
	const role = pathname.startsWith("/admin")
		? "Admin"
		: pathname.startsWith("/publisher")
		? "Publisher"
		: pathname.startsWith("/mentor")
		? "Mentor"
		: pathname.startsWith("/manager")
		? "Manager"
		: pathname.startsWith("/employer")
		? "Employer"
		: pathname.startsWith("/course-creator")
		? "Course Creator"
		: "Student";
	// Function to filter the menu based on user role
	const getRoleBasedMenu = (menuList: MenuItem[]) => {
		switch (role) {
			case "Admin":
				return menuList.filter((menu) => menu.title === "Admin");
			case "Publisher":
				return menuList.filter((menu) => menu.title === "Publisher");
			case "Mentor":
				return menuList.filter((menu) => menu.title === "Mentor");
			case "Student":
				return menuList.filter((menu) => menu.title === "Student");
			case "Employer":
				return menuList.filter((menu) => menu.title === "Employer");
			case "Course Creator":
				return menuList.filter((menu) => menu.title === "Course Creator");
			case "Manager":
				return menuList.filter((menu) => menu.title === "Manager");
			default:
				return [];
		}
	};

	const filteredMenuList = getRoleBasedMenu(MenuList || []);

	const shouldHideMenu = (mainMenu: MenuItem) => {
		return mainMenu?.Items?.map((data) => data.title).every((titles) =>
			pinedMenu.includes(titles || "")
		);
	};

	return (
		<>
			{filteredMenuList &&
				filteredMenuList.map((mainMenu: MenuItem, index) => (
					<Fragment key={index}>
						<li
							className={`sidebar-main-title ${
								shouldHideMenu(mainMenu) ? "d-none" : ""
							}`}>
							<div>
								<h6 className={mainMenu.lanClass ? mainMenu.lanClass : ""}>
									{t(mainMenu.title)}
								</h6>
							</div>
						</li>
						<Menulist
							menu={mainMenu.Items}
							activeMenu={activeMenu}
							setActiveMenu={setActiveMenu}
							level={0}
						/>
					</Fragment>
				))}
		</>
	);
};

export default SidebarMenuList;

import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle, StudentTitle } from "@/Constant";

const StudentDashboardContainer = () => {
	return (
		<>
			<Breadcrumbs
				mainTitle={"Student Dashboard"}
				parent={StudentTitle}
				title={DashboardTitle}
			/>
		</>
	);
};

export default StudentDashboardContainer;

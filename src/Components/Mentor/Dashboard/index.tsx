import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { DashboardTitle, MentorTitle } from "@/Constant";

const MentorDashboardContainer = () => {
    return (
        <>
            <Breadcrumbs mainTitle={DashboardTitle} parent={MentorTitle} title={DashboardTitle}/>
        </>
    );
}

export default MentorDashboardContainer;
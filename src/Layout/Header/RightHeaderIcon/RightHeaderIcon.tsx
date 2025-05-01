import { Col } from "reactstrap";
import ResponsiveSearchInput from "./ResponsiveSearchInput/ResponsiveSearchInput";
import Announcements from "./Announcements/Announcements";
import UserProfile from "./UserProfile/UserProfile";
import ZoomInOut from "./ZoomInOut/ZoomInOut";
import DarkMode from "./DarkMode/DarkMode";

const RightHeaderIcon = () => {
	return (
		<Col
			xxl={7}
			xl={8}
			className='nav-right col-auto box-col-6 pull-right right-header p-0 ms-auto'>
			<ul className='nav-menus'>
				{/* <ResponsiveSearchInput /> */}
				{/* <Language /> */}
				<ZoomInOut />
				{/* <HeaderBookmark /> */}
				{/* <DarkMode /> */}
				{/* <HeaderMessage /> */}
				{/* <HeaderCart /> */}
				{/* <HeaderCartCourse /> */}
				<Announcements />
				<UserProfile />
			</ul>
		</Col>
	);
};
export default RightHeaderIcon;

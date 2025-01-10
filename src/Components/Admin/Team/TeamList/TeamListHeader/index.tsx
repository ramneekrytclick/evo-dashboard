import {
	AddCreator,
	AddManager,
	AddMentorTitle,
	addUserTitle,
	Href,
} from "@/Constant";
import { TeamListHeaderProp } from "@/Types/Team.type";
import Link from "next/link";
import { useState } from "react";
import { Filter } from "react-feather";
import {
	Card,
	CardBody,
	Collapse,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from "reactstrap";
import TeamListBody from "./TeamListBody";

const TeamListHeader = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const handleFilterToggle = () => {
		setIsFilterOpen((prevState) => !prevState);
	};
	return (
		<div className="list-product-header">
			<div>
				<div className="light-box">
					<a
						href={Href}
						onClick={handleFilterToggle}>
						{isFilterOpen ? (
							<i className="icon-close filter-close" />
						) : (
							<Filter className="filter-icon" />
						)}
					</a>
				</div>
				<Link
					className="btn btn-primary"
					href={"/admin/team/add_user"}>
					<i className="fa fa-plus me-2" /> {addUserTitle}
				</Link>
				<UncontrolledDropdown>
					<DropdownToggle
						color="primary"
						className="pe-5"
						caret>
						{"Add"}
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem>
							<Link href={"/admin/managers/add_manager"}>{AddManager}</Link>
						</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>
							<Link href={"/admin/creators/add_creator"}>{AddCreator}</Link>
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</div>
			<Collapse className={isFilterOpen ? "show" : ""}>
				<Card className="list-product-body">
					<CardBody>
						<TeamListBody />
					</CardBody>
				</Card>
			</Collapse>
		</div>
	);
};

export default TeamListHeader;

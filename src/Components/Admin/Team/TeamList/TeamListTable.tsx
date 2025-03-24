import { useEffect, useState } from "react";

import { TeamListType, UserProps } from "@/Types/Team.type";
import DataTable, { TableColumn } from "react-data-table-component";
// import { teamListColumns } from "@/Data/Admin/Team/TeamList";
import FilterComponent from "@/CommonComponent/FilterComponent";
import {
	approveUser,
	getPendingApprovals,
	getUsers,
} from "@/app/api/admin/team";
import { teamFakeData } from "@/FakeData/admin/team";
import { Badge, Button } from "reactstrap";

const TeamListTable = () => {
	const [teamListTableData, setTeamListTableData] = useState<UserProps[]>([]);
	const handleApproveUser = async (row: TeamListType) => {
		// Approve user logic
		console.log("Approve user");
		try {
			const response = await approveUser(row._id, "approve");
		} catch (error) {}
	};
	const teamListColumns: TableColumn<TeamListType>[] = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
			cell: (row) => <p style={{ fontWeight: 700 }}>{row.name}</p>,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
			cell: (row) => <p className="f-light">{row.email}</p>,
		},
		{
			name: "Role",
			selector: (row) => row.role.toUpperCase(),
			sortable: true,
			cell: (row) => (
				<Badge
					color=""
					pill
					style={{ fontSize: 13 }}
					className={`badge-${
						row.role.toLowerCase() === "admin"
							? "primary"
							: row.role.toLowerCase() === "manager"
							? "danger"
							: row.role.toLowerCase() === "student"
							? "info"
							: row.role.toLowerCase() === "coursecreator"
							? "success"
							: "secondary"
					}`}>
					{row.role}
				</Badge>
			),
		},
		{
			name: "Action",
			cell: (row) => (
				<Button
					color="success"
					onClick={() => {
						handleApproveUser(row);
					}}>
					Approve User
				</Button>
			),
			sortable: false,
		},
	];
	const fetchData = async () => {
		try {
			const response = await getPendingApprovals();
			setTeamListTableData(response);
		} catch (error) {
			console.log(error);
			// setTeamListTableData(teamFakeData);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	const [filterText, setFilterText] = useState("");

	const filteredItems: UserProps[] = teamListTableData.filter(
		(item: UserProps) => {
			return Object.values(item).some(
				(value) =>
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
			);
		}
	);
	return (
		<div className="list-product">
			<FilterComponent
				onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
					setFilterText(e.target.value)
				}
				filterText={filterText}
			/>
			<DataTable
				className="custom-scrollbar"
				data={filteredItems}
				columns={teamListColumns}
				pagination
			/>
		</div>
	);
};

export default TeamListTable;

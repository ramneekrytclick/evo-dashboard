import { useEffect, useState } from "react";

import { UserProps } from "@/Types/Team.type";
import DataTable from "react-data-table-component";
import { teamListColumns } from "@/Data/Admin/Team/TeamList";
import FilterComponent from "@/CommonComponent/FilterComponent";
import { getUsers } from "@/app/api/admin/team";

const TeamListTable = () => {
	const [teamListTableData, setTeamListTableData] = useState<UserProps[]>([]);
	const fetchData = async () => {
		const data = await getUsers();
		try {
			const response = await data;
			const filteredTeam = response.users.filter((user:any)=>{
				//if user's role is Manager, Admin, Creator or Course Creator, set TeamListTableData as the filtered team
				if(user.role === 'Manager' || user.role === 'Admin' || user.role === 'Creator' || user.role.toLowerCase() === 'coursecreator'){
					return true;
				}
				return false;
			})
			setTeamListTableData(filteredTeam);
		} catch (error) {
			console.log(error);
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

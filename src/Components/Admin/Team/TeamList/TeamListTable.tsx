import { useEffect, useState } from "react";

import { TeamListType, UserProps } from "@/Types/Team.type";
import DataTable from "react-data-table-component";
import { teamListColumns } from "@/Data/Admin/Team/TeamList";
import axios from "axios";
import { sampleTeamListTableData } from "./SampleData";
import FilterComponent from "@/CommonComponent/FilterComponent";

const TeamListTable = () => {
    const [teamListTableData,setTeamListTableData]=useState<UserProps[]>([]);
    const fetchData =async ()=>{
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const data = axios.get(process.env.NEXT_PUBLIC_BASE_URL + 'admin/users',{
            headers: {'x-api-key':apiKey}
        })
        try {
            const response = await data;
            setTeamListTableData(response.data);
        }
        catch (error) {
            console.log(error);
            setTeamListTableData(sampleTeamListTableData.users);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    const [filterText, setFilterText] = useState('');
    const filteredItems: TeamListType[] = teamListTableData.filter(
        (item: TeamListType) => {
            return Object.values(item).some((value) =>
                value && value.toString().toLowerCase().includes(filterText.toLowerCase())
            );
        }
    );
    return (
        <div className="list-product">
            <FilterComponent
                onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                filterText={filterText}
            />
            <DataTable className='custom-scrollbar' data={filteredItems} columns={teamListColumns} pagination />
        </div>
    )
}

export default TeamListTable;
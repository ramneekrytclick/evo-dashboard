"use client"
import { getMyTickets } from "@/app/api/support/support";
import { supportTableColumns } from "@/Data/Support/support";
import { SupportTicketProps } from "@/Types/Support.type";
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CreateTicketModal from "./CreateTicketModal";

const TicketTable = () => {
  const [data, setData] = useState<SupportTicketProps[]>([]);
  const fetchTickets = async()=>{
    try {
        const response = await getMyTickets();
        setData(response.tickets);
    } catch (error) {
        console.error(error);        
    }
  }
  useEffect(()=>{
    fetchTickets()
  },[])
  return (
    <div className="table-responsive custom-scrollbar">
      <CreateTicketModal fetchData={fetchTickets}/>
      <DataTable columns={supportTableColumns} data={data} striped={true} />
    </div>
  );
};
export default TicketTable;
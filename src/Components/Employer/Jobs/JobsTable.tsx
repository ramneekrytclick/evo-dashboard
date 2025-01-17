"use client"

import { getJobs } from "@/app/api/employer";
import { useState } from "react";
import { toast } from "react-toastify";

const JobApplicationsTable = () => {
    const [jobs,setJobs]=useState([])
    const fetchJobs = async () => {
        try {
            const response = await getJobs();
            // const jobs = response.jobs;
            setJobs(response)
        } catch (error) {
            toast.error("Error fetching jobs");
        }
    }
    return (
        <div>
            {JSON.stringify(jobs)}
        </div>
    );
}

export default JobApplicationsTable;
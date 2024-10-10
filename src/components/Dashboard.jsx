import {useEffect, useState} from "react";
import jobService from "../services/jobService.js";
import {DataGrid} from "@mui/x-data-grid";
import { useAuth } from "../services/authState.jsx"
import AddJobModal from "./AddJobModal.jsx";

const Dashboard = () => {

    const {logout, token, isAuthenticated} = useAuth()
    const [jobs, setJobs] = useState([])
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Fetching jobs with token:", token);
            jobService.fetchJobs(token).then((response) => {
                console.log("Fetched jobs:", response);
                setJobs(response);
            }).catch((error) => {
                console.error("Error fetching jobs:", error);
            });
        }
    }, [token, isAuthenticated]);

    const handleAddJob = (jobData) => {
        console.log("token from handle job is", token)
        jobService.addJob(jobData, token).then((response) => {
            if (response.status === 200) {
                console.log("Fetching jobs with token:", token);
                jobService.fetchJobs(token).then((response) => {
                    console.log("Fetched jobs:", response);
                    setJobs(response);
                }).catch((error) => {
                    console.error("Error fetching jobs:", error);
                });
            }
        })
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const columns = [
        { field: "jobId", headerName: "Job ID", width:  100 },
        { field: 'jobTitle', headerName: 'Job Title', width: 150 },
        { field: 'companyName', headerName: 'Company', width: 150 },
        { field: 'applicationDate', headerName: 'Application Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 }
    ];

    return(
        <>
            <h1>This is the dashboard page</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={openModal}>Add New</button>
            {modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal} />}
            <DataGrid columns={columns} rows={jobs} getRowId={(row) => row.jobId.counter} />
        </>
    );
};

export default Dashboard;
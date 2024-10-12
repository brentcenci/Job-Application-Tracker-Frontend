import {useAuth} from "@/src/services/authState.jsx";
import {useEffect, useState} from "react";
import jobService from "@/src/services/jobService.js";
import AddJobModal from "@/src/components/AddJobModal.jsx";
import {DataGrid} from "@mui/x-data-grid";

const Dash = () => {

    const cardClassname = "bg-gray-800 rounded-md p-6 shadow-md "
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

    const tableColumns = [
        { field: "jobId", headerName: "Job ID", width:  100 },
        { field: 'jobTitle', headerName: 'Job Title', width: 150 },
        { field: 'companyName', headerName: 'Company', width: 150 },
        { field: 'applicationDate', headerName: 'Application Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 }
    ];

    return(
        <>
            <div className="bg-gray-700">
                <div className="w-full h-20 bg-gray-800 text-white flex justify-between items-center p-6">
                    <h1 className="text-3xl">Your Dashboard</h1>
                    <div className="text-gray-600 space-x-2">
                        <button onClick={handleAddJob}>Add New</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className="p-6 max-w-screen-xl">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 grid-rows-8 md:grid-rows-8 lg:grid-rows-5 gap-6 text-white">

                        <div className={cardClassname + ""}>
                            <div className="text-2xl font-semibold mb-1">17</div>
                            <div className="text-sm font-medium text-gray-400">Total Applications</div>
                        </div>

                        <div className={cardClassname + ""}>
                            <div className="text-2xl font-semibold mb-1">2</div>
                            <div className="text-sm font-medium text-gray-400">Active Applications</div>
                        </div>

                        <div className={cardClassname + "col-span-2 md:row-span-1"}>
                            <div className="text-2xl font-semibold mb-1">2</div>
                            <div className="text-sm font-medium text-gray-400">Users</div>
                        </div>

                        <div className={cardClassname + "row-span-2 col-span-2 lg:col-span-3"}>
                            <div className="text-2xl font-semibold mb-1">2</div>
                            <div className="text-sm font-medium text-gray-400">Users</div>
                        </div>

                        <div className={cardClassname + "col-span-1 row-span-2 md:col-span-1"}>
                            <div className="text-2xl font-semibold mb-1">100</div>
                            <div className="text-sm font-medium text-gray-400">Companies</div>
                        </div>


                        <div className={cardClassname + "col-span-1 row-span-2 md:col-span-1 lg:col-span-2"}>
                            <div className="text-2xl font-semibold mb-1">100</div>
                            <div className="text-sm font-medium text-gray-400">Blogs</div>
                        </div>

                        <div className={cardClassname + "row-span-2 col-span-2 md:row-span-2"}>
                            <div className="text-2xl font-semibold mb-1">Special Box</div>
                            <div className="text-sm font-medium text-gray-400">This box spans two columns</div>
                        </div>
                    </div>
                    <div className="bg-white mt-24">
                        {modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal}/>}
                        <DataGrid columns={tableColumns} rows={jobs} getRowId={(row) => row.jobId.counter}/>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Dash;
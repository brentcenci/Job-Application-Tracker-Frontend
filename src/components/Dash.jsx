import {useAuth} from "@/src/services/authState.jsx";
import {useEffect, useState} from "react";
import jobService from "@/src/services/jobService.js";
import AddJobModal from "@/src/components/AddJobModal.jsx";
import {DataGrid} from "@mui/x-data-grid";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css'

const Dash = () => {

    const cardClassname = "bg-white text-gray-900 rounded-md p-6 shadow-md "
    const {logout, token, isAuthenticated} = useAuth()
    const [jobs, setJobs] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false)

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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const tableColumns = [
        { field: 'jobTitle', headerName: 'Job Title', width: 150},
        { field: 'companyName', headerName: 'Company', width: 150},
        { field: 'applicationDate', headerName: 'Application Date', width: 150},
        { field: 'status', headerName: 'Status', width: 150 }
    ];

    return(
        <>
            <div className="bg-slate-100">
                <div className="w-full h-20 bg-white text-gray-900 flex justify-between items-center p-6">
                    <h1 className="text-3xl">Your Dashboard</h1>
                    <div className="text-gray-600 space-x-2">
                        <button onClick={toggleDarkMode}>Toggle Dark</button>
                        <button onClick={openModal}>Add New</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className="p-6 max-w-screen-xl mx-auto">
                    {modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal}/>}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 grid-rows-8 md:grid-rows-8 lg:grid-rows-5 gap-6 text-white">

                        <div className={cardClassname + ""}>
                            <div className="text-2xl font-semibold mb-1">{jobs.length}</div>
                            <div className="text-sm font-medium text-gray-400">Total Applications</div>
                        </div>

                        <div className={cardClassname + ""}>
                            <div className="text-2xl font-semibold mb-1">{jobs.filter(value => value.status !== "Declined").length}</div>
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
                    <div className="bg-white mt-24 dark">
                        <DataGrid
                            columns={tableColumns}
                            rows={jobs}
                            getRowId={(row) => row.jobId.counter}
                            className=""
                        />
                        <div
                            className={`${darkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`}
                            style={{height: '500px', width: '100%'}}
                        >
                            <AgGridReact
                                rowData={jobs}
                                columnDefs={tableColumns}
                                defaultColDef={{sortable: true, filter: true, editable: true}}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Dash;
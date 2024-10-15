import {useAuth} from "@/src/services/authState.jsx";
import {useEffect, useState} from "react";
import jobService from "@/src/services/jobService.js";
import AddJobModal from "@/src/components/AddJobModal.jsx";
import {AgCharts} from "ag-charts-react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css'

const Dash = () => {

    const {logout, token, isAuthenticated} = useAuth()
    const [jobs, setJobs] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false)
    const [jobDataByMonth, setJobDataByMonth] = useState(groupJobsByMonth(jobs));
    const [jobsStatusData, setJobsStatusData] = useState(groupJobsByStatus(jobs));


    const chartOptions = {
        data: jobDataByMonth,
        series: [
            {
                type: "line",
                xKey: "month",
                yKey: "count"
            }
        ],
        background: {
            fill: darkMode ? "color-mix(in srgb, #fff, #182230 97%)" : "#fff"
        },
    };

    const pieOptions = {
        data: jobsStatusData,
        series: [
            {
                type: 'pie',
                angleKey: 'count',
                legendItemKey: 'status'
            }
        ],
        background: {
            fill: darkMode ? "color-mix(in srgb, #fff, #182230 97%)" : "#fff"
        },
    };

    const cardClassname = darkMode ? "ag-theme-quartz-card-dark p-6 rounded-lg " : "p-6 ag-theme-quartz-card rounded-lg "

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
    };

    useEffect(() => {
        setJobDataByMonth(groupJobsByMonth(jobs));
        setJobsStatusData(groupJobsByStatus(jobs));
    }, [jobs]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    function groupJobsByMonth(jobs) {
        const groupedData = {};

        jobs.forEach(job => {
            const date = new Date(job.applicationDate);
            const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM
            groupedData[monthYear] = (groupedData[monthYear] || 0) + 1;
        });

        return Object.entries(groupedData).map(([month, count]) => ({
            month,
            count,
        }));
    }

    function groupJobsByStatus(jobs) {
        const groupedData = {};

        jobs.forEach(job => {
            const status = job.status;
            groupedData[status] = (groupedData[status] || 0) + 1;
        });

        return Object.entries(groupedData).map(([status, count]) => ({
            status,
            count,
        }));
    }

    const tableColumns = [
        { field: 'jobTitle', headerName: 'Job Title', width: 200},
        { field: 'jobLevel', headerName: 'Level', width: 150},
        { field: 'industry', headerName: 'Industry', width: 150 },
        { field: 'companyName', headerName: 'Company', width: 200},
        { field: 'applicationDate', headerName: 'Applied', width: 150, editable: false},
        { field: 'status', headerName: 'Status', width: 100, cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ["Applied", "Interview", "Offer", "Accepted", "Declined"]} },
        { field: 'source', headerName: 'Source', width: 150 },
    ];

    return(
        <>
            <div className={darkMode ? "bg-gray-700" : "bg-gray-200"}>
                <div className={`${darkMode ? "ag-theme-quartz-card-dark" : "ag-theme-quartz-card"} w-full h-20 flex justify-between items-center p-6`}>
                    <h1 className="text-3xl">Your Dashboard</h1>
                    <div className="text-gray-600 space-x-2">
                        <button onClick={toggleDarkMode}>Toggle Dark</button>
                        <button onClick={openModal}>Add New</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className="p-6 max-w-screen-xl mx-auto">
                    {modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal}/>}
                    <div
                        className="grid auto-rows-min grid-cols-2 md:grid-cols-2 lg:grid-cols-4 grid-rows-8 md:grid-rows-8 lg:grid-rows-5 gap-6 text-white">

                        <div className={cardClassname + ""}>
                            <div className="text-2xl font-semibold mb-1">{jobs.length}</div>
                            <div className="text-sm font-medium text-gray-400">Total Applications</div>
                        </div>

                        <div className={cardClassname + ""}>
                            <div
                                className="text-2xl font-semibold mb-1">{jobs.filter(value => value.status !== "Declined").length}</div>
                            <div className="text-sm font-medium text-gray-400">Active Applications</div>
                        </div>

                        <div className={cardClassname + "col-span-2 md:row-span-1"}>
                            <div className="text-2xl font-semibold mb-1">2</div>
                            <div className="text-sm font-medium text-gray-400">Users</div>
                        </div>

                        <div className={cardClassname + "row-span-2 col-span-2 lg:col-span-3"}>
                            <AgCharts options={
                                chartOptions
                            }/>
                        </div>

                        <div className={cardClassname + "col-span-1 row-span-2 md:col-span-1"}>
                            <AgCharts options={
                                pieOptions
                            }/>
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
                    <div className="bg-white mt-6 rounded-xl">
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
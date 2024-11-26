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
    const [darkMode, setDarkMode] = useState(false)

    let myButton = (params) => {
        return <button className= {darkMode ? "py-1 text-sm text-white" : "py-1 text-sm bg-red-400"} onClick={() => {
            window.alert('Deleted Row')
            jobService.deleteJob(params.data, token).then((response) => {
                console.log("Delete Job response:", response)
                jobService.fetchJobs(token).then((response) => {
                    console.log("Fetched jobs:", response);
                    setJobs(response);
                }).catch((error) => {
                    console.error("Error fetching jobs:", error);
                });
            }).catch((error) => {
                console.log("Delete Job error:", error);
            })
        }}>Delete</button>;
    }

    const {logout, token, isAuthenticated} = useAuth()
    const [jobs, setJobs] = useState([])
    const [modalOpen, setModalOpen] = useState(false);

    const [searchTextValue, setSearchTextValue] = useState("");
    const [jobDataByMonth, setJobDataByMonth] = useState(groupJobsByMonth(jobs));
    const [jobsStatusData, setJobsStatusData] = useState(groupJobsByStatus(jobs));
    const [jobsSourceData, setJobsSourceData] = useState(groupJobsBySource(jobs));
    const [jobsLevelData, setJobsLevelData] = useState(groupJobsByLevel(jobs));
    const [gridOptions, setGridOptions] = useState({
        rowData: jobs,
        columnDefs: [
            { field: 'jobTitle', headerName: 'Job Title', width: 200},
            { field: 'jobLevel', headerName: 'Level', width: 150},
            { field: 'industry', headerName: 'Industry', width: 150 },
            { field: 'companyName', headerName: 'Company', width: 200},
            { field: 'applicationDate', headerName: 'Applied', width: 150, editable: false},
            { field: 'status', headerName: 'Status', width: 100, cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ["Applied", "Interview", "Offer", "Accepted", "Declined"]} },
            { field: 'source', headerName: 'Source', width: 150 },
            { headerName: 'Delete', cellRenderer: myButton }
        ],
            defaultColDef: {
            sortable: true,
                filter: true,
                editable: true
        },
        readOnlyEdit: true,
            onCellEditRequest: event => onCellEdit(event),
    });

    useEffect(() => {
        console.log(searchTextValue)
    }, [searchTextValue]);

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

    const statusPieOptions = {
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

    const sourcePieOptions = {
        data: jobsSourceData,
        series: [
            {
                type: 'pie',
                angleKey: 'count',
                legendItemKey: 'source'
            }
        ],
        background: {
            fill: darkMode ? "color-mix(in srgb, #fff, #182230 97%)" : "#fff"
        },
    };

    const levelBarOptions = {
        data: jobsLevelData,
        series: [
            {
                type: "bar",
                xKey: "level",
                yKey: "count"
            }
        ],
        background: {
            fill: darkMode ? "color-mix(in srgb, #fff, #182230 97%)" : "#fff"
        },
    }

    const cardClassname = darkMode ? "ag-theme-quartz-card-dark p-6 rounded-lg " : "p-6 ag-theme-quartz-card rounded-lg "

    useEffect(() => {
        if (isAuthenticated) {
            fetchJobs()
        }
    }, [token, isAuthenticated]);

    const fetchJobs = () => {
        console.log("Fetching jobs with token:", token);
        jobService.fetchJobs(token).then((response) => {
            console.log("Fetched jobs:", response);
            setJobs(response);
        }).catch((error) => {
            console.error("Error fetching jobs:", error);
        });
    }

    const handleAddJob = (jobData) => {
        console.log("token from handle job is", token)
        jobService.addJob(jobData, token).then(() => {
            console.log("Fetching jobs with token:", token);
            jobService.fetchJobs(token).then((response) => {
                console.log("Fetched jobs:", response);
                setJobs(response);
            }).catch((error) => {
                console.error("Error fetching jobs:", error);
            });
        })
    };

    useEffect(() => {
        setJobDataByMonth(groupJobsByMonth(jobs));
        setJobsStatusData(groupJobsByStatus(jobs));
        setJobsSourceData(groupJobsBySource(jobs));
        setJobsLevelData(groupJobsByLevel(jobs));
        setGridOptions({
            rowData: jobs,
            columnDefs: [
                { field: 'jobTitle', headerName: 'Job Title', width: 200},
                { field: 'jobLevel', headerName: 'Level', width: 150},
                { field: 'industry', headerName: 'Industry', width: 150 },
                { field: 'companyName', headerName: 'Company', width: 200},
                { field: 'applicationDate', headerName: 'Applied', width: 150, editable: false},
                { field: 'status', headerName: 'Status', width: 100, cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ["Applied", "Interview", "Offer", "Accepted", "Declined"]} },
                { field: 'source', headerName: 'Source', width: 150 },
                { headerName: 'Delete', cellRenderer: myButton }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                editable: true
            },
            readOnlyEdit: true,
            onCellEditRequest: event => onCellEdit(event),
        });
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
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            groupedData[monthYear] = (groupedData[monthYear] || 0) + 1;
        });

        return Object.entries(groupedData).map(([month, count]) => ({
            month,
            count,
        }))
            .sort((a, b) => a.month.localeCompare(b.month));
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

    function groupJobsBySource(jobs) {
        const groupedData = {};

        jobs.forEach(job => {
            const source = job.source;
            groupedData[source] = (groupedData[source] || 0) + 1;
        });

        return Object.entries(groupedData).map(([source, count]) => ({
            source,
            count,
        }));
    }

    function groupJobsByLevel(jobs) {
        const groupedData = {};

        jobs.forEach(job => {
            const level = job.jobLevel;
            groupedData[level] = (groupedData[level] || 0) + 1;
        });

        return Object.entries(groupedData).map(([level, count]) => ({
            level,
            count,
        }));
    }



    function onCellEdit(event) {
        console.log("Edit request: ", event);
        console.log("JobId: ", event.data.jobId)
        console.log("Old Value: ", event.oldValue, ", New Value: ", event.value);
        jobService.updateJob(event.data, event.column.colId, event.value, token).then((response) => {
            console.log("Updated job:", response);
            console.log("Fetching jobs with token:", token);
            jobService.fetchJobs(token).then((response) => {
                console.log("Fetched jobs:", response);
                setJobs(response);
            }).catch((error) => {
                console.error("Error fetching jobs:", error);
            });
        })
    }



    return(
        <>
            <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} " w-screen h-full"`}>
                {modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal}/>}
                {/*"block bg-black bg-opacity-20 w-full h-full z-10 fixed"*/}
                <div className={modalOpen ? "" : ""}>
                    <div className={`${darkMode ? "ag-theme-quartz-card-dark" : "ag-theme-quartz-card"} w-full h-20 flex justify-between items-center p-6`}>
                        <h1 className="text-3xl">Your Dashboard</h1>
                        <div className="text-gray-600 space-x-2">
                            <button onClick={toggleDarkMode}>Toggle Dark</button>
                            <button onClick={openModal}>Add New</button>
                            <button onClick={logout}>Logout</button>
                        </div>
                    </div>
                    {/*{modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal}/>}*/}
                    <div className="p-6 max-w-screen-xl mx-auto">

                        <div
                            className="grid auto-rows-min grid-cols-2 md:grid-cols-2 lg:grid-cols-4 grid-rows-8 md:grid-rows-8 lg:grid-rows-5 gap-6 text-white">

                            <div className={cardClassname + ""}>
                                <div className="text-5xl font-semibold mb-1">{jobs.length}</div>
                                <div className="text-lg font-medium text-gray-400">Total Applications</div>
                            </div>

                            <div className={cardClassname + "items-center"}>
                                <div
                                    className="text-5xl font-semibold mb-1">{jobs.filter(value => value.status !== "Declined" && value.status !== "Rejected").length}</div>
                                <div className="text-lg font-medium text-gray-400">Active Applications</div>
                            </div>

                            <div className={cardClassname + "col-span-2 md:row-span-1"}>
                                <div className="text-2xl font-semibold mb-1">2</div>
                                <div className="text-sm font-medium text-gray-400">Users</div>
                            </div>

                            <div className={cardClassname + "row-span-2 col-span-2 lg:col-span-3"}>
                                <div className="text-start text-2xl font-semibold mb-1">Frequency</div>
                                <div className="text-start text-sm font-medium text-gray-400">Number of job applications submitted each month</div>
                                <AgCharts options={
                                    chartOptions
                                }/>
                            </div>

                            <div className={cardClassname + "col-span-1 row-span-2 md:col-span-1"}>
                                <div className="text-start text-2xl font-semibold mb-1">Status</div>
                                <div className="text-start text-sm font-medium text-gray-400">The distribution of the state of all applications
                                </div>
                                <AgCharts options={
                                    statusPieOptions
                                }/>
                            </div>


                            <div className={cardClassname + "col-span-1 row-span-2 md:col-span-1 lg:col-span-2"}>
                                <div className="text-start text-2xl font-semibold mb-1">Source</div>
                                <div className="text-start text-sm font-medium text-gray-400">The distribution of the sources of the job listings you apply for</div>
                                <AgCharts options={
                                    sourcePieOptions
                                }/>
                            </div>

                            <div className={cardClassname + "row-span-2 col-span-2 md:row-span-2"}>
                                <div className="text-start text-2xl font-semibold mb-1">Level</div>
                                <div className="text-start text-sm font-medium text-gray-400">The levels of the roles you are applying for
                                </div>
                                <AgCharts options={
                                    levelBarOptions
                                }/>
                            </div>
                        </div>
                        <div className={`${darkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz '} mt-20 flex flex-row space-x-2`}>
                            <input
                                placeholder="Search your applications"
                                className={`w-full rounded-xl ${darkMode ? 'bg-gray-800 ag-theme-quartz-dark ' : 'ag-theme-quartz '} rounded-xl p-4`}
                                value={searchTextValue}
                                onInput={e => setSearchTextValue(e.target.value)}
                            />
                        </div>
                        <div className="mt-6 rounded-xl">
                            <div
                                className={`${darkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`}
                                style={{height: '500px', width: '100%'}}
                            >
                                <AgGridReact
                                    quickFilterText={searchTextValue}
                                    gridOptions={gridOptions}
                                    rowData={jobs}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Dash;
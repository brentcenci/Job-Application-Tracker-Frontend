import {useAuth} from "@/src/services/authState.jsx";
import {useEffect, useState} from "react";
import jobService from "@/src/services/jobService.js";
import AddJobModal from "@/src/components/AddJobModal.jsx";
import {AgCharts} from "ag-charts-react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {rgb} from "d3-color";
import Loading from "@/src/components/Loading.jsx";

const Dash = () => {
    const [darkMode, setDarkMode] = useState(false)

    let myButton = (params) => {
        return <button className= {darkMode ? "py-1 text-sm text-white" : "py-1 text-sm bg-red-400"} onClick={() => {
            window.alert('Deleted Row')
            setIsLoading(true);
            jobService.deleteJob(params.data, token).then((response) => {
                console.log("Delete Job response:", response)
                jobService.fetchJobs(token).then((response) => {
                    console.log("Fetched jobs:", response);
                    setJobs(response);
                    setIsLoading(false);
                }).catch((error) => {
                    console.error("Error fetching jobs:", error);
                    setIsLoading(false);
                });
            }).catch((error) => {
                console.log("Delete Job error:", error);
                setIsLoading(false);
            })
        }}>Delete</button>;
    }

    const {logout, token, isAuthenticated} = useAuth()
    const [jobs, setJobs] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [searchTextValue, setSearchTextValue] = useState("");
    const [jobDataByMonth, setJobDataByMonth] = useState(groupJobsByMonth(jobs));
    const [jobsIndustryData, setJobsIndustryData] = useState(groupJobsByIndustry(jobs));
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
            { field: 'status', headerName: 'Status', width: 100, cellEditor: 'agSelectCellEditor', cellEditorParams: {values: ["Applied", "Interview", "Offer", "Accepted", "Declined", "Rejected"]} },
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
        axes: [
            {
                type: "number",
                position: "left",
                min: 0,
                title: {
                    text: "Number of Applications Submitted"
                }
            },
            {
                type: "category",
                position: "bottom",
                title: {
                    text: "Month of Year (in YYYY-MM)"
                }
            }
        ],
        background: {
            fill: darkMode ? "color-mix(in srgb, #fff, #182230 97%)" : "#fff"
        },
    };

    const industryPieOptions = {
        data: jobsIndustryData,
        series: [
            {
                type: 'pie',
                angleKey: 'count',
                legendItemKey: 'industry'
            }
        ],
        background: {
            fill: darkMode ? "color-mix(in srgb, #fff, #182230 97%)" : "#fff"
        },
    };

    const industryBarOptions = {
        data: jobsIndustryData,
        series: [
            {
                type: "bar",
                xKey: "industry",
                yKey: "count"
            }
        ],
        background: {
            fill: darkMode ? "color-mix(in srgb, #fff, #182230 97%)" : "#fff"
        }
    }

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

    const cardClassname = darkMode ? "ag-theme-quartz-card-dark p-6 rounded-lg " : "p-6 ag-theme-quartz-card rounded-lg ";
    const buttonClassname = darkMode ? "bg-grey-700 ag-theme-quartz-card-dark h-12 " : "ag-theme-quartz-card h-12 ";

    useEffect(() => {
        if (isAuthenticated) {
            fetchJobs()
        }
    }, [token, isAuthenticated]);

    const fetchJobs = () => {
        setIsLoading(true);
        console.log("Fetching jobs with token:", token);
        jobService.fetchJobs(token).then((response) => {
            console.log("Fetched jobs:", response);
            setIsLoading(false);
            setJobs(response);
        }).catch((error) => {
            console.error("Error fetching jobs:", error);
            setIsLoading(false);
        });
    }

    const handleAddJob = (jobData) => {
        console.log("token from handle job is", token)
        jobService.addJob(jobData, token).then(() => {
            setIsLoading(true)
            console.log("Fetching jobs with token:", token);
            jobService.fetchJobs(token).then((response) => {
                console.log("Fetched jobs:", response);
                setIsLoading(false);
                setJobs(response);
            }).catch((error) => {
                console.error("Error fetching jobs:", error);
                setIsLoading(false);
            });
        })
    };

    useEffect(() => {
        setJobDataByMonth(groupJobsByMonth(jobs));
        setJobsIndustryData(groupJobsByIndustry(jobs))
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

    function groupJobsByIndustry(jobs) {
        const groupedData = {};

        jobs.forEach(job => {
            const industry = job.industry;
            groupedData[industry] = (groupedData[industry] || 0) + 1;
        });

        return Object.entries(groupedData).map(([industry, count]) => ({
            industry,
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
            setIsLoading(true);
            jobService.fetchJobs(token).then((response) => {
                setIsLoading(false);
                console.log("Fetched jobs:", response);
                setJobs(response);
            }).catch((error) => {
                console.error("Error fetching jobs:", error);
                setIsLoading(false);
            });
        })
    }



    return(
        <>
            <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} " w-screen h-full"`}>
                {modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal}/>}
                {isLoading && <Loading />}
                {/*"block bg-black bg-opacity-20 w-full h-full z-10 fixed"*/}
                <div className={modalOpen ? "" : ""}>
                    <div className={`${darkMode ? "ag-theme-quartz-card-dark" : "ag-theme-quartz-card"} w-full h-20 flex justify-between items-center p-6`}>
                        <h1 className="text-3xl">Your Dashboard</h1>
                        <div className="text-gray-600 space-x-2 flex justify-between items-center">
                            <button className={" bg-blue-700 text-white h-12"} onClick={openModal}>Add New +</button>
                            <button className={buttonClassname + ""} onClick={toggleDarkMode}>{darkMode ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 24 24"
                                     className="duoicon duoicon-sun size-8" style={{color: "gold"}}>
                                    <path fill="currentColor"
                                          d="M12 18.5a1.5 1.5 0 0 1 1.493 1.356L13.5 20v1a1.5 1.5 0 0 1-2.993.144L10.5 21v-1a1.5 1.5 0 0 1 1.5-1.5Zm0-17a1.5 1.5 0 0 1 1.493 1.356L13.5 3v1a1.5 1.5 0 0 1-2.993.144L10.5 4V3A1.5 1.5 0 0 1 12 1.5Zm5.303 3.075a1.5 1.5 0 0 1 2.225 2.008l-.103.114-.707.707a1.5 1.5 0 0 1-2.225-2.008l.103-.114.707-.707Zm-12.728 0a1.5 1.5 0 0 1 2.008-.103l.114.103.707.707a1.5 1.5 0 0 1-2.008 2.225l-.114-.103-.707-.707a1.5 1.5 0 0 1 0-2.122ZM21 10.5a1.5 1.5 0 0 1 .144 2.993L21 13.5h-1a1.5 1.5 0 0 1-.144-2.993L20 10.5h1Zm-17 0a1.5 1.5 0 0 1 .144 2.993L4 13.5H3a1.5 1.5 0 0 1-.144-2.993L3 10.5h1Z"
                                          className="duoicon-primary-layer"></path>
                                    <path fill="currentColor"
                                          d="M12 6c4.619 0 7.506 5 5.196 9A6 6 0 0 1 12 18c-4.619 0-7.506-5-5.196-9A6 6 0 0 1 12 6Z"
                                          className="duoicon-secondary-layer" opacity=".3"></path>
                                    <path fill="currentColor"
                                          d="M5.282 16.596a1.5 1.5 0 0 1 2.225 2.008l-.103.114-.707.707a1.5 1.5 0 0 1-2.225-2.008l.103-.114.707-.707Zm11.314 0a1.5 1.5 0 0 1 2.008-.103l.114.103.707.707a1.5 1.5 0 0 1-2.008 2.225l-.114-.103-.707-.707a1.5 1.5 0 0 1 0-2.122Z"
                                          className="duoicon-primary-layer"></path>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 24 24"
                                     className="duoicon duoicon-moon-stars size-8" style={{color: rgb(99, 102, 241)}}>
                                    <path fill="currentColor"
                                          d="M12.477 4.546A1.01 1.01 0 0 1 13.5 3.127c.025.002.049.006.074.01 6.821 1.213 9.771 9.356 5.31 14.656-4.462 5.301-12.988 3.784-15.348-2.73a9.012 9.012 0 0 1-.399-1.489 1.01 1.01 0 0 1 1.339-1.125c.024.008.047.018.07.028 4.214 1.892 8.895-1.488 8.426-6.083a5.998 5.998 0 0 0-.495-1.848Z"
                                          className="duoicon-secondary-layer" opacity=".3"></path>
                                    <path fill="currentColor"
                                          d="M8.397 2.857c.04-.09.166-.09.206 0l.102.222a5.191 5.191 0 0 0 1.97 2.172l.157.092c.073.04.075.144.003.187l-.003.002-.158.092a5.193 5.193 0 0 0-2.07 2.394.113.113 0 0 1-.195.022c-.004-.007-.009-.014-.012-.022l-.102-.222a5.191 5.191 0 0 0-1.97-2.172l-.158-.092a.108.108 0 0 1-.003-.187l.003-.002.158-.092a5.191 5.191 0 0 0 1.97-2.172l.102-.222ZM5.565 7.716l.064.14a3.257 3.257 0 0 0 1.237 1.363l.1.059a.068.068 0 0 1 0 .118l-.1.058a3.26 3.26 0 0 0-1.237 1.364l-.064.14a.07.07 0 0 1-.122.013.057.057 0 0 1-.008-.013l-.064-.14a3.26 3.26 0 0 0-1.237-1.364l-.1-.058a.068.068 0 0 1 0-.118l.1-.059c.534-.326.964-.8 1.236-1.364l.064-.14a.07.07 0 0 1 .122-.013.057.057 0 0 1 .008.013l.001.001Z"
                                          className="duoicon-primary-layer"></path>
                                </svg>}</button>
                            <button className={buttonClassname} onClick={logout}>Logout</button>
                        </div>
                    </div>
                    {/*{modalOpen && <AddJobModal onAdd={handleAddJob} onClose={closeModal}/>}*/}
                    <div className="p-6 max-w-screen-xl mx-auto">

                        <div
                            className="grid auto-rows-min grid-cols-2 md:grid-cols-2 lg:grid-cols-4 grid-rows-5 md:grid-rows-5 lg:grid-rows-4 gap-6 text-white">

                            <div className={cardClassname + ""}>
                                <div className="text-5xl font-semibold mb-1">{jobs.length}</div>
                                <div className="text-lg font-medium text-gray-400">Applications you have logged on this
                                    app
                                </div>
                            </div>
                            <div className={cardClassname + "hidden lg:block row-span-2 col-span-2 lg:col-span-3"}>
                                <div className="text-start text-2xl font-semibold mb-1">Frequency</div>
                                <div className="text-start text-sm font-medium text-gray-400">Number of job applications
                                    submitted each month
                                </div>
                                <AgCharts options={
                                    chartOptions
                                }/>
                            </div>

                            <div className={cardClassname + "items-center"}>
                                <div
                                    className="text-5xl font-semibold mb-1">{jobs.filter(value => value.status !== "Declined" && value.status !== "Rejected").length}</div>
                                <div className="text-lg font-medium text-gray-400">Applications that are currently active and not declined or rejected</div>
                            </div>


                            {/*<div className={cardClassname + "col-span-2 md:row-span-1"}>
                                <div className="text-2xl font-semibold mb-1">Industries</div>
                                <div className="text-sm font-medium text-gray-400"></div>
                            </div>*/}
                            <div className={cardClassname + "col-span-2 row-span-2"}>
                                <div className="text-start text-2xl font-semibold mb-1">Industry</div>
                                <div className="text-start text-sm font-medium text-gray-400">The distribution of industries you have applied for
                                </div>
                                <AgCharts options={
                                    industryBarOptions
                                }/>
                            </div>

                            <div className={cardClassname + "lg:hidden row-span-2 col-span-2 lg:col-span-3"}>
                                <div className="text-start text-2xl font-semibold mb-1">Frequency</div>
                                <div className="text-start text-sm font-medium text-gray-400">Number of job applications
                                    submitted each month
                                </div>
                                <AgCharts options={
                                    chartOptions
                                }/>
                            </div>

                            <div className={cardClassname + "col-span-1 row-span-2 md:col-span-1 lg:col-span-2"}>
                                <div className="text-start text-2xl font-semibold mb-1">Status</div>
                                <div className="text-start text-sm font-medium text-gray-400">The distribution of the
                                    state of all applications
                                </div>
                                <AgCharts options={
                                    statusPieOptions
                                }/>
                            </div>


                            <div className={cardClassname + "col-span-1 row-span-2 md:col-span-1 lg:col-span-2"}>
                                <div className="text-start text-2xl font-semibold mb-1">Source</div>
                                <div className="text-start text-sm font-medium text-gray-400">The distribution of the
                                    sources of the job listings you apply for
                                </div>
                                <AgCharts options={
                                    sourcePieOptions
                                }/>
                            </div>

                            <div className={cardClassname + "row-span-2 col-span-2 row-span-2"}>
                                <div className="text-start text-2xl font-semibold mb-1">Level</div>
                                <div className="text-start text-sm font-medium text-gray-400">The levels of the roles
                                    you are applying for
                                </div>
                                <AgCharts options={
                                    levelBarOptions
                                }/>
                            </div>
                        </div>
                        <div
                            className={`${darkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz '} mt-20 flex flex-row space-x-2`}>
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
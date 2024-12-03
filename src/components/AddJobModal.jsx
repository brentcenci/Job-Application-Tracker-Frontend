import jobService from "../services/jobService.js";
import {useEffect, useState} from "react";

const AddJobModal = ({ onAdd, onClose }) => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobLevel, setJobLevel] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [url, setUrl] = useState("");
    const [updateDate, setUpdateDate] = useState(getCurrentDate);

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 since getMonth() returns 0-indexed month
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newJob = {
            jobTitle,
            jobLevel,
            companyName,
            industry,
            applicationDate,
            updateDate,
            status,
            source,
            url
        };
        console.log(newJob);

        try {
           /* const addedJob = await jobService.addJob(newJob, );*/
            onAdd(newJob); // Add job to the parent component (Dashboard)
            onClose(); // Close the modal after adding the job
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    /*return (
        <div className="z-10">
            <div className="z-10 flex justify-center bg-gray-800">
                <div className="modal-content ">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                    <h2>Add New Job</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Job Title:</label>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Job Level:</label>
                            <input
                                type="text"
                                value={jobLevel}
                                onChange={(e) => setJobLevel(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Company Name:</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Industry:</label>
                            <input
                                type="text"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Application Date:</label>
                            <input
                                type="date"
                                value={applicationDate}
                                onChange={(e) => setApplicationDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Status:</label>
                            <input
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Source:</label>
                            <input
                                type="text"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>URL:</label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <button type="submit">Add Job</button>
                    </form>
                </div>
            </div>

        </div>
    );*/
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg md:text-2xl font-semibold">Add Job Application</h2>
                    <button
                        className="bg-red-500 text-white hover:bg-red-600 text-lg md:text-2xl font-bold py-1 px-3"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="text-sm space-y-1 md:space-y-2">
                    <div className="flex flex-row md:flex-col">
                        <label className="block font-medium mb-1 w-1/2">Job Title</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-row md:flex-col">
                        <label className="block font-medium mb-1 w-1/2">Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-row md:flex-col">
                    <label className="block font-medium mb-1 w-1/2">Job Level</label>
                        <input
                            type="text"
                            value={jobLevel}
                            onChange={(e) => setJobLevel(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-row md:flex-col">
                        <label className="block font-medium mb-1 w-1/2">Industry</label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-row md:flex-col">
                        <label className="block font-medium mb-1 w-1/2">Application Date</label>
                        <input
                            type="date"
                            value={applicationDate}
                            onChange={(e) => setApplicationDate(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-row md:flex-col">
                        <label className="block font-medium mb-1 w-1/2">Status</label>
                        {/*<input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />*/}
                        <select
                            name="status"
                            value={status}

                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Declined">Declined</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex flex-row md:flex-col">
                        <label className="block font-medium mb-1 w-1/2">Source</label>
                        <input
                            type="text"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-row md:flex-col">
                        <label className="block font-medium mb-1 w-1/2">URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Add Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;
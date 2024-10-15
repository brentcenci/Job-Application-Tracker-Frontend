import jobService from "../services/jobService.js";
import {useState} from "react";

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

    return (
        <div className="z-10 absolute">
            <div className="z-10 flex justify-center">
                <div className="modal-content bg-gray-100 justify-center">
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
    );
};

export default AddJobModal;
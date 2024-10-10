import jobService from "../services/jobService.js";
import {useState} from "react";

const AddJobModal = ({ onAdd, onClose }) => {
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newJob = {
            jobTitle,
            companyName,
            applicationDate,
            status
        };

        try {
           /* const addedJob = await jobService.addJob(newJob, );*/
            onAdd(newJob); // Add job to the parent component (Dashboard)
            onClose(); // Close the modal after adding the job
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    return (
        <div className="modal bg-gray-100 absolute z-10">
            <div className="modal-content">
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
                        <label>Company Name:</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
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
                    <button type="submit">Add Job</button>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;
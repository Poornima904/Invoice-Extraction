import React, { useState } from "react";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage("");
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }
        // Simulate upload
        setMessage("File uploaded successfully!");
        // Here you can add your upload logic (e.g., using fetch or axios)
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Upload Invoice</h2>
            <form onSubmit={handleUpload}>
                <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
                <button type="submit" style={{ marginTop: 16 }}>Upload</button>
            </form>
            {message && <p style={{ marginTop: 16 }}>{message}</p>}
        </div>
    );
};

export default UploadPage;
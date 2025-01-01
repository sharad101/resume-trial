

import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Include a CSS file for styling

const App = () => {
    const [requirements, setRequirements] = useState('');
    const [resume, setResume] = useState(null);
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('requirements', requirements);
        formData.append('resume', resume);

        try {
            const response = await axios.post('http://localhost:5010/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data.match);
        } catch (error) {
            console.error(error);
            setResult('Failed to process resume');
        }
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h1>Resume Matcher</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="requirements-input"
                        placeholder="Enter job requirements"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                    />
                    <input
                        className="file-input"
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                    <button className="submit-button" type="submit">Submit</button>
                </form>
                {result && (
                    <div className="result-container">
                        <h2>Match Result:</h2>
                        <p>{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

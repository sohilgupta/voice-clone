import React, { useState } from 'react';

function Upload() {
    const [file, setFile] = useState(null);
    const [language, setLanguage] = useState('en');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('audio', file);
        formData.append('language', language);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="zh">Mandarin</option>
                <option value="hi">Hindi</option>
            </select>
            <button type="submit">Upload</button>
        </form>
    );
}

export default Upload;
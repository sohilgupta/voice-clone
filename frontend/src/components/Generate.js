import React, { useState } from 'react';

function Generate() {
    const [text, setText] = useState('');
    const [settings, setSettings] = useState({ pitch: 1, speed: 1, tone: 1 });
    const [audio, setAudio] = useState(null);

    const handleTextChange = (e) => setText(e.target.value);

    const handleSettingsChange = (newSettings) => setSettings(newSettings);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, ...settings }),
        });

        const result = await response.json();
        setAudio(result.audio);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea value={text} onChange={handleTextChange} />
                <Settings onSettingsChange={handleSettingsChange} />
                <button type="submit">Generate</button>
            </form>
            {audio && <audio controls src={audio} />}
        </div>
    );
}

export default Generate;
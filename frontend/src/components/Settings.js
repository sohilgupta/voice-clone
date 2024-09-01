import React, { useState } from 'react';

function Settings({ onSettingsChange }) {
    const [pitch, setPitch] = useState(1);
    const [speed, setSpeed] = useState(1);
    const [tone, setTone] = useState(1);

    const handlePitchChange = (e) => setPitch(e.target.value);
    const handleSpeedChange = (e) => setSpeed(e.target.value);
    const handleToneChange = (e) => setTone(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSettingsChange({ pitch, speed, tone });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Pitch:
                <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={handlePitchChange} />
            </label>
            <label>
                Speed:
                <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={handleSpeedChange} />
            </label>
            <label>
                Tone:
                <input type="range" min="0.5" max="2" step="0.1" value={tone} onChange={handleToneChange} />
            </label>
            <button type="submit">Apply</button>
        </form>
    );
}

export default Settings;
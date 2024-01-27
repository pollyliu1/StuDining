import React, { useState } from 'react';

export default function Settings() {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('english');

    return (
        <div>
            <h1>Settings</h1>

            <div>
                <label>Theme: </label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div>
                <label>Language: </label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                </select>
            </div>
        </div>
    );
}
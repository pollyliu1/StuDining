"use client";
import React, { useState } from 'react';

export default function Study() {
    const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]); // Provide initial value for messages state
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInput('');
        setMessages([...messages, { text: input, sender: 'user' }]);
    };

    return (
        <div className="flex flex-col h-screen" style={{ marginTop: '5rem', position: 'relative', top: 0, width: '98vw', height: '100vh' }}>
            <div className="overflow p-4" style={{ wordWrap: 'break-word'}}>
                {messages.map((message, index) => (
                    <div key={index} className={`p-2 m-2 rounded ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="m-5">
                <input
                    type="text"
                    style={{ wordWrap: 'break-word'}}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border rounded text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral"
                    placeholder="Type your message..."
                />
            </form>
        </div>
    );
}
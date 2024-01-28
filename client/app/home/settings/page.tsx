"use client";
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';

export default function Settings() {
    const [parent, setP] = useState('m');

    const [theme, setTheme] = useState('light');

    return (<Container  style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}> 
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '6rem',
          position: 'absolute',
          width: '20rem',
          height: '20rem',
          borderRadius: '2rem',
          backgroundColor: '#f5f5f5' // Light gray background
        }}>
          <h1 className='m-5 '>Settings</h1>
      
          <div>
            <label>Parent: </label>
            <select value={parent} onChange={(e) => setP(e.target.value)}>
              <option value="m">Mother</option>
              <option value="f">Father</option>
            </select>
          </div>
      
          <div>
            <label>Theme: </label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        </Container>
      );
}
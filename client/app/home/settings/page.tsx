"use client";
import { Container } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { UserContext } from '../index';

export default function Settings() {

    const [theme, setTheme] = useState('light');
    const userContext = useContext(UserContext);

    let voice, setVoice: any;
    
    if (userContext !== null) {
      voice = userContext.voice;
      setVoice = userContext.setVoice;
    }

    let parent, setP: any;
    
    if (userContext !== null) {
      parent = userContext.parent;
      setP = userContext.setP;
    }

    let tone, setTone: any;
    
    if (userContext !== null) {
      tone = userContext.tone;
      setTone = userContext.setTone;
    }
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
      
          <div className='p-1'>
            <label>Parent: </label>
            <select value={parent} onChange={(e) => setP(e.target.value)}>
              <option value="m">Mother</option>
              <option value="f">Father</option>
            </select>
          </div>
      
          <div className='p-1'>
            <label>Theme: </label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className='p-1'>
            <label>Voice: </label>
            <select value={voice} onChange={(e) => setVoice(e.target.value)}>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </select>
          </div>
          <div className='p-1'>
            <label>Tone: </label>
            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value={"h"}>Happy</option>
              <option value={"m"}>Mad</option>
            </select>
          </div>
        </div>
        </Container>
      );
}
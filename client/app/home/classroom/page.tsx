'use client';
import React from 'react';
import { useState, useRef } from "react";
import AudioRecorder from './audioRecorder';

export default function Classroom() {
    return (
        <div className="classroom" style={{ marginTop: '6rem', position: 'absolute', top: 0, left: 0, width: '100vw'}}>
            
                <AudioRecorder>

                </AudioRecorder>
                
        </div>
    );
};
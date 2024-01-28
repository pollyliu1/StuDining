"use client";
import React from "react";
import Image from "next/image";
import img from "../../../../assets/Leftbar.png";

import { useState, useRef } from "react";
import AudioRecorder from "./audioRecorder";
import { Container, Col } from "react-bootstrap";

export default function Classroom() {
  return (
    <Container
      className="classroom flex w-100"
      style={{
        marginTop: "5rem",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
      }}
    >
      <Col>
        <div style={{ display: "flex", left: 0}}>
          <Image src={img} width={437} height={10} alt={"whoopsies"}></Image>
        </div>
      </Col>
      <Col style={{ display: "flex", left: 0, marginTop:  "12.7rem", marginLeft:  "21.55rem"   }}>
        <AudioRecorder></AudioRecorder>
      </Col>
    </Container>
  );
}

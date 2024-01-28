"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "../../../../assets/Leftbar.png";
import { Container, Col, Row } from "react-bootstrap";

export default function Study() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  ); // Provide initial value for messages state
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    setMessages([...messages, { text: input, sender: "user" }]);
  };

  const SummarizeRecent = () => {
    fetch('http://127.0.0.1:8000/summarize/')
      .then(response => response.text())  // parse the response body as text
      .then(data => console.log(data))  // print the response body
      .catch(error => console.error('Error:', error));
  };
  SummarizeRecent();

  return (
    <Container className="study flex w-100">
      <Col>
        <div style={{ display: "flex" }}>
          <Image src={img} width={476} height={10} alt={"whoopsies"}></Image>
        </div>
      </Col>
      <Col className="d-flex mr-40 mt-40 ml-auto">
        <div className="chatbox oveflow-auto"
          style={{ marginTop: "5rem", position: "relative", top: 0, right: 0, width: "350px"}}
        >
          <div className="overflow-auto p-4" style={{ wordWrap: "break-word", scale: '0.75', marginTop: "2.45rem", maxHeight: "24rem", width: "24rem"}}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 m-2 rounded ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{position: "absolute", marginTop: "24.25rem", marginRight: "0rem",borderRadius: "2rem", width: "18.2rem"}}>
            <input
              type="text"
              style={{ position: "relative", wordWrap: "break-word", scale: "0.95", borderRadius: "2rem", width: "18.54rem", height: "2rem", marginTop: "0.33rem", marginLeft: "1.75rem", marginRight: "0.0rem", marginBottom: "0.5rem"}}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" p-2 border rounded text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral"
              placeholder="Type your message..."
            />
          </form>
        </div>
      </Col>
    </Container>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import img from "../../../../assets/Leftbar.png";
import imgMotherH from "../../../../assets/Mom Happy.png";
import imgFatherH from "../../../../assets/Dad Happy.png";
import imgMotherM from "../../../../assets/Mom Mad.png";
import imgFatherM from "../../../../assets/Dad Mad.png";

import { Container, Col, Row } from "react-bootstrap";
import { UserContext } from "../index";
export default function Study() {
  const [input, setInput] = useState("");

  let [Cohere, setCohere] = useState("");
  const [blank, setBlank] = useState("");

  let [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext);

  let voice: string | undefined;
  let setVoice: React.Dispatch<React.SetStateAction<string>> | undefined;

  if (userContext !== null) {
    voice = userContext.voice;
    setVoice = userContext.setVoice;
  }

  const [theme, setTheme] = useState("light");

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

  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );

  useEffect(() => {
    if (isLoading) {
      fetch("http://127.0.0.1:8000/summarize/")
        .then((response) => response.text()) // parse the response body as text
        .then((data) => {
          setIsLoading(false);
          setBlank(data);
        })
        // print the response body
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (blank != "") {
      messages.push({ text: blank, sender: "other" });
    }
  }, [blank]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");

    if (voice === "true") {
      let utterance = new SpeechSynthesisUtterance(input);
      let voicesArray = speechSynthesis.getVoices();
      utterance.voice = voicesArray[1];
      speechSynthesis.speak(utterance);
    }
    if (input != "") {
      setMessages([...messages, { text: input, sender: "user" }]);
    }
  };

  // Fetch data --> 1.)
  useEffect(() => {
    // Fetch the Cohere data from the server
    try {
      fetch(`http://127.0.0.1:8000/message`, {
        method: "GET",
      })
        .then((res) => res.text())
        .then((data) => {
          setCohere(data);
        })
        .catch((error) => {});
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (Cohere != "") {
      setMessages([...messages, { text: Cohere, sender: "other" }]);
    }
  }, [Cohere]);

  return (
    <Container className="study flex w-100">
      <Col>
        <div style={{ display: "flex" }}>
          <Image src={img} width={476} height={10} alt={"whoopsies"}></Image>
        </div>
      </Col>
      <Col>
        <div style={{ display: "flex", marginTop: "10rem" }}>
          {tone === "m" ? (
            parent === "m" ? (
              <Image src={imgMotherM} alt="Mother" width={300} height={300} />
            ) : (
              <Image src={imgFatherM} alt="Father" width={300} height={300} />
            )
          ) : parent === "m" ? (
            <Image src={imgMotherH} alt="Mother" width={250} height={300} />
          ) : (
            <Image src={imgFatherH} alt="Father" width={300} height={300} />
          )}
        </div>
      </Col>
      <Col className="d-flex mr-40 mt-40 ml-auto">
        <div
          className="chatbox oveflow-auto"
          style={{
            marginTop: "5rem",
            position: "relative",
            top: 0,
            right: 0,
            width: "350px",
          }}
        >
          <div
            className="overflow-auto p-4"
            style={{
              wordWrap: "break-word",
              scale: "0.75",
              marginTop: "2.45rem",
              maxHeight: "24rem",
              width: "24rem",
            }}
          >
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

          <form
            onSubmit={handleSubmit}
            style={{
              position: "absolute",
              marginTop: "24.25rem",
              marginRight: "0rem",
              borderRadius: "2rem",
              width: "18.2rem",
            }}
          >
            <input
              type="text"
              style={{
                position: "relative",
                wordWrap: "break-word",
                scale: "0.95",
                borderRadius: "2rem",
                width: "18.54rem",
                height: "2rem",
                marginTop: "0.33rem",
                marginLeft: "1.75rem",
                marginRight: "0.0rem",
                marginBottom: "0.5rem",
              }}
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

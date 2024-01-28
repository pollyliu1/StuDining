import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import img from "../../../assets/settings.png";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
type UserContextType = {
  parent: string;
  setP: React.Dispatch<React.SetStateAction<string>>;
  voice: string;
  setVoice: React.Dispatch<React.SetStateAction<string>>;
  tone: string;
  setTone: React.Dispatch<React.SetStateAction<string>>;
};
export const UserContext = React.createContext<UserContextType | null>(null);
export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [voice, setVoice] = useState("true");
  const [parent, setP] = useState("m");
  const [tone, setTone] = useState("m");
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav
          style={{
            display: "flex",
            position: "fixed",
            width: "100%",
            top: 0,
            background: "transparent",
          }}
        >
          <ul
            className="icon"
            style={{
              listStyleType: "none",
              justifyContent: "left",
              display: "block",
              margin: 0,
              padding: 0,
              overflow: "hidden",
            }}
          >
            <li style={{ float: "left" }}>
              <Link href="/home">
                <div
                  style={{
                    display: "block",
                    color: "black",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Home
                </div>
              </Link>
            </li>
            <li style={{ float: "right" }}>
              <Link href="/home/settings">
                <div
                  className="iconimg"
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  <Image src={img} width={26} height={26} alt={"whoopsies"}></Image>
                </div>
              </Link>
            </li>
              <ul
                className="navbar"
                style={{
                  listStyleType: "none",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <li>
                  <Link href="/home/classroom">
                    <div>Classroom</div>
                  </Link>
                </li>
                <li>
                  <Link href="/home/study">
                    <div>Study</div>
                  </Link>
                </li>

                {/* Add more links as needed */}
              </ul>
          </ul>
        </nav>
        <UserContext.Provider value={{ voice: voice, setVoice: setVoice, parent: parent, setP: setP, tone: tone, setTone: setTone }}>
        {children}
        </UserContext.Provider>
      </body>
    </html>
  );
}

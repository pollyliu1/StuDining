import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("english");
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav
          style={{
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
                    padding: "14px 16px",
                    textDecoration: "none",
                  }}
                >
                  Home
                </div>
              </Link>
            </li>
          <div className="center m-5">
          <ul
            className="navbar"
            style={{
              listStyleType: "none",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <li style={{ float: "left" }}>
              <Link href="/home/classroom">
                <div
                >
                  Classroom
                </div>
              </Link>
            </li>
            <li style={{ float: "left" }}>
              <Link href="/home/study">
                <div
    
                >
                  Study
                </div>
              </Link>
            </li>

            {/* Add more links as needed */}
          </ul>
          </div>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}

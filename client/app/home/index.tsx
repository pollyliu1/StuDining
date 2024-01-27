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
            disply: "flex",
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
                  className="iconimg"
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
                    color: "black",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Settings
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
        {children}
      </body>
    </html>
  );
}

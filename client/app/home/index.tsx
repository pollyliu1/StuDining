import type { Metadata } from "next";
import Link from 'next/link';
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
      <body className={inter.className}>
        <nav
          style={{
            position: "fixed",
            width: "100%",
            background: "transparent",
          }}
        >
          <ul className="navbar"
            style={{
              listStyleType: "none",
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
            <li style={{ float: "left" }}>
              <Link href="/home/about">
                <div
                  style={{
                    display: "block",
                    color: "black",
                    textAlign: "center",
                    padding: "14px 16px",
                    textDecoration: "none",
                  }}
                >
                  About
                </div>
              </Link>
            </li>
            <li style={{ float: "left" }}>
              <Link href="/home/classroom">
                <div
                  style={{
                    display: "block",
                    color: "black",
                    textAlign: "center",
                    padding: "14px 16px",
                    textDecoration: "none",
                  }}
                >
                  Classroom
                </div>
              </Link>
            </li>
            <li style={{ float: "left" }}>
              <Link href="/home/study">
                <div
                  style={{
                    display: "block",
                    color: "black",
                    textAlign: "center",
                    padding: "14px 16px",
                    textDecoration: "none",
                  }}
                >
                  Study
                </div>
              </Link>
            </li>
            
            {/* Add more links as needed */}
          </ul>
        </nav>
        {children}
      </body>
    </html>

    )
}
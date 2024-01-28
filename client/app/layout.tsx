"use client";
import type { Metadata } from "next";
import { useState } from 'react';
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";

import Home from './home'; // Import your HomePage component



const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //e.preventDefault();
    // Add your authentication logic here if needed
    setIsLoggedIn(true);
    router.push("/home/classroom");
  };
  
  if (isLoggedIn || currentPath != "/") {
    console.log("logged in");
    return (<Home>{children}</Home>); // Render the HomePage component if the user is logged in
  }
  return (        
  <html lang="en">
  <body className={inter.className}>
  <form className="login" onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <input type="submit" value="Log in" />
    </form>
    </body>
    {children}
    </html>
  );
}

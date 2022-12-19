import "./globals.css";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <nav className="bg-green-500">This is navigation</nav>
      {children}
    </html>
  );
}

export default RootLayout;

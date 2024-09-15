import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      &copy; {new Date().getFullYear()} Copyright: <a href="/"> Smarket.com </a>
    </div>
  );
}

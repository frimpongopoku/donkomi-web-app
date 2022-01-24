import React from "react";
import "./PageTitle.css";
export default function PageTitle({
  className,
  title = "This is your page title",
  subtitle = "Enter some page title you know, it would be nice",
}) {
  return (
    <div className={`ui-page-intro ${className}`}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

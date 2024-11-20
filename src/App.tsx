import React, { useState, useEffect } from "react";
import Split from "react-split";
import JSONEditor from "./components/JSONEditor";
import FormPreview from "./components/FormPreview";
import "./App.css";

const App: React.FC = () => {
  const [schema, setSchema] = useState<string>(
    JSON.stringify(
      {
        formTitle: "Project Requirements Survey",
        formDescription: "Please fill out this survey about your project needs",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Full Name",
            required: true,
            placeholder: "Enter your full name",
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "you@example.com",
          },
          {
            id: "industry",
            type: "radio",
            label: "Industry",
            required: true,
            options: [
              { value: "tech", label: "Technology" },
              { value: "healthcare", label: "Healthcare" },
              { value: "finance", label: "Finance" },
              { value: "retail", label: "Retail" },
            ],
          },
        ],
      },
      null,
      2
    )
  );

  const [isVertical, setIsVertical] = useState(window.innerWidth < 768);

  // Update layout direction on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app-container">
      <Split
        className={`split ${isVertical ? "vertical" : "horizontal"}`}
        sizes={isVertical ? [100] : [50, 50]}
        minSize={isVertical ? 0 : 200}
        gutterSize={5}
        direction={isVertical ? "vertical" : "horizontal"}
      >
        <div className={`pane ${isVertical ? "" : "p-4"}`}>
          <JSONEditor schema={schema} setSchema={setSchema} />
        </div>
        <div
          className={`pane ${isVertical ? "w-full p-4" : "p-4 bg-gray-100"}`}
        >
          <FormPreview schema={schema} />
        </div>
      </Split>
    </div>
  );
};

export default App;

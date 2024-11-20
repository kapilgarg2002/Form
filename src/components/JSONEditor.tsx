import React from "react";
import Editor from "@monaco-editor/react";

interface JSONEditorProps {
  schema: string;
  setSchema: (schema: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, setSchema }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">JSON Schema Editor</h2>
      <Editor
        height="90vh"
        defaultLanguage="json"
        value={schema}
        onChange={(value) => setSchema(value || "")}
        theme="vs-dark"
      />
    </div>
  );
};

export default JSONEditor;

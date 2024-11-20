import { render, screen } from "@testing-library/react";
import FormPreview from "./components/FormPreview";

test("renders form title and description", () => {
  const schema = JSON.stringify({
    formTitle: "Test Form",
    formDescription: "This is a test form",
    fields: [],
  });

  render(<FormPreview schema={schema} />);
  expect(screen.getByText("Test Form")).toBeInTheDocument();
  expect(screen.getByText("This is a test form")).toBeInTheDocument();
});

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";

interface FormPreviewProps {
  schema: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let parsedSchema;
  try {
    parsedSchema = JSON.parse(schema);
  } catch (error) {
    return <p className="text-red-500">Invalid JSON Schema</p>;
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{parsedSchema.formTitle}</h2>
      <p className="mb-6">{parsedSchema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {parsedSchema.fields.map((field: any) => (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.id}
              className="block text-sm font-medium mb-2"
            >
              {field.label}
            </label>
            {field.type === "text" || field.type === "email" ? (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern,
                })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : null}
            {field.type === "select" ? (
              <select
                id={field.id}
                {...register(field.id, { required: field.required })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {field.options.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}
            {field.type === "radio"
              ? field.options.map((option: any) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <input
                      id={`${field.id}-${option.value}`}
                      type="radio"
                      value={option.value}
                      {...register(field.id, { required: field.required })}
                      className="mr-2"
                    />
                    <label htmlFor={`${field.id}-${option.value}`}>
                      {option.label}
                    </label>
                  </div>
                ))
              : null}

            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>
        ))}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;

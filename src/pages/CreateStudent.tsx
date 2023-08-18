import { useState } from "react";
import Input from "../components/Input/Input";
import { IInputFields } from "../interfaces/inputInterface";
import Layout from "./Layout";

const fields: IInputFields[] = [
  {
    name: "name",
    labelFor: "name",
    labelText: "name",
    id: "name",
    isRequired: true,
    placeholder: "Name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "college",
    labelFor: "college",
    labelText: "College",
    id: "college",
    isRequired: true,
    placeholder: "College name",
    type: "text",
    autoComplete: "college",
  },
  {
    name: "batch",
    labelFor: "batch",
    labelText: "batch",
    id: "batch",
    isRequired: true,
    type: "text",
    autoComplete: "batch",
    placeholder: "Batch name",
  },
];

const CreateStudent = () => {
    const [newStudentState, setNewStudentState] = useState();
  return (
    <Layout>
      {fields.map((field) => (
        <Input
          name={field.name}
          labelFor={field.labelFor}
          labelText={field.labelText}
          id={field.id}
          isRequired={field.isRequired}
          placeholder={field.placeholder}
          type={field.type}
          autoComplete={field.autoComplete}
        />
      ))}
    </Layout>
  );
};

export default CreateStudent;

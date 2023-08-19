import { useState, ChangeEvent } from "react";
import Input from "../components/Input/Input";
import { IInputFields } from "../interfaces/inputInterface";
import makeRequest from "../utils/makeRequest";
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
interface IStudentDetails {
  name: string;
  college: string;
  batch: string;
  status: string;
}

const CreateStudent = () => {
  const [newStudentState, setNewStudentState] = useState<IStudentDetails>({
    name: "",
    batch: "",
    college: "",
    status: "",
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStudentState({ ...newStudentState, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
      const data = await makeRequest('/student', {
          method: "POST",
          body: JSON.stringify({
              name: newStudentState.name,
              batch: newStudentState.batch,
              college: newStudentState.college,
              status: newStudentState.status,
          })
      });
  }

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
          handleChange={changeHandler}
        />
      ))}
    </Layout>
  );
};

export default CreateStudent;

import { useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
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
  {
    name: "DSAFinalScore",
    labelFor: "DSAFinalScore",
    labelText: "DSAFinalScore",
    id: "DSAFinalScore",
    isRequired: false,
    type: "number",
    autoComplete: "DSAFinalScore",
    placeholder: "DSA Final Score",
  },
  {
    name: "WebDFinalScore",
    labelFor: "WebDFinalScore",
    labelText: "WebDFinalScore",
    id: "WebDFinalScore",
    isRequired: false,
    type: "number",
    autoComplete: "WebDFinalScore",
    placeholder: "Web Development Score",
  },
  {
    name: "ReactFinalScore",
    labelFor: "ReactFinalScore",
    labelText: "ReactFinalScore",
    id: "ReactFinalScore",
    isRequired: false,
    type: "number",
    autoComplete: "ReactFinalScore",
    placeholder: "React Final Score",
  },
];
interface IStudentDetails {
  name: string;
  college: string;
  batch: string;
  status: string;
  DSAFinalScore: number;
  WebDFinalScore: number;
  ReactFinalScore: number;
  [index: string]: string | number,
}

interface ICreateStudentProps {
  state: boolean;
  setState: (state: boolean) => void;
  initialState?: IStudentDetails;
}

const CreateStudent = (props: ICreateStudentProps) => {
  const { id } = useParams();
  console.log("create student", props.initialState?.name || "");
  const [newStudentState, setNewStudentState] = useState<IStudentDetails>({
    name: props.initialState?.name || "",
    batch: props.initialState?.batch || "",
    college: props.initialState?.college || "",
    status: props.initialState?.status || "not_placed",
    DSAFinalScore: props.initialState?.DSAFinalScore || 0,
    WebDFinalScore: props.initialState?.WebDFinalScore || 0,
    ReactFinalScore: props.initialState?.ReactFinalScore || 0,
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewStudentState({ ...newStudentState, [e.target.name]: e.target.value });
  };

  const closeHandler = () => {
    props.setState(false);
  };

  const submitHandler = async () => {
    if (props.initialState?.name) {
      const data = await makeRequest("/student/" + id, {
        method: "PUT",
        body: JSON.stringify({ ...newStudentState }),
      });
    } else {
      const data = await makeRequest("/student", {
        method: "POST",
        body: JSON.stringify({
          name: newStudentState.name,
          batch: newStudentState.batch,
          college: newStudentState.college,
          status: newStudentState.status,
          scores: {
            DSAFinalScore: newStudentState.DSAFinalScore,
            WebDFinalScore: newStudentState.WebDFinalScore,
            ReactFinalScore: newStudentState.ReactFinalScore,
          },
        }),
      });
    }
    closeHandler();
  };

  return (
    <Modal
      submitHandler={submitHandler}
      isActive={props.state}
      closeHandler={closeHandler}
      className="flex flex-col"
    >
      <div className="mb-4 flex-1">
        <h1>Add a new student</h1>
        <div className="flex flex-col justify-center items-center mt-2 flex-auto">
          {fields.map((field) => (
            <Input
              name={field.name}
              labelFor={field.labelFor}
              labelText={field.labelText}
              id={field.id}
              isRequired={field.isRequired}
              placeholder={
                props.initialState
                  ? props?.initialState[field.name]?.toString()
                  : field.placeholder
              }
              type={field.type}
              autoComplete={field.autoComplete}
              handleChange={changeHandler}
              value={newStudentState[field.name]}
            />
          ))}
          <select name="status" id="status" onChange={changeHandler}>
            <option value="not_placed">Not placed</option>
            <option value="placed">Placed</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default CreateStudent;

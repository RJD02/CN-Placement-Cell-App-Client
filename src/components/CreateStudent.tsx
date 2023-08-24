import { useState, ChangeEvent } from "react";
import { IStudent } from "../pages/Students";
import makeRequest from "../utils/makeRequest";
import Input from "./Input/Input";
import Modal from "./Modal/Modal";
interface IcreateStudentProps {
  state: boolean;
  setState: (state: boolean) => void;
}

const initialState = {
  name: "",
  batch: "",
  status: "",
  college: "",
  _id: "",
} satisfies IStudent;

const CreateStudent = (props: IcreateStudentProps) => {
  const [newStudentState, setNewStudentState] =
    useState<IStudent>(initialState);
  const [isModalActive, setIsModalActive] = useState(props.state);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStudentState({ ...newStudentState, [e.target.name]: e.target.value });
  };
  const closeHandler = () => {
    setIsModalActive(false);
    props.setState(false);
  };
  const submitHandler = async () => {
    const data = await makeRequest("/student", {
      method: "POST",
      body: JSON.stringify(newStudentState),
    });
    // TODO: Flashing message
    closeHandler();
  };
  return (
    <Modal
      submitHandler={submitHandler}
      isActive={isModalActive}
      closeHandler={closeHandler}
      className="flex flex-col"
    >
      <div className="mb-4 flex-1">
        <h1 className="text-2xl text-center">Schedule new interview</h1>
        <div className="flex flex-col justify-center items-center mt-2 flex-auto">
          <Input
            id="name"
            labelFor=""
            labelText="Company Name"
            name="companyName"
            placeholder="Google,Microsoft,..."
            type="text"
            isRequired={true}
            handleChange={changeHandler}
          />
          <Input
            id="position"
            labelFor="position"
            labelText="position"
            name="position"
            placeholder="Backend Developer"
            type="text"
            isRequired={true}
            handleChange={changeHandler}
          />
          <Input
            id="date"
            labelFor="date"
            labelText="date"
            name="date"
            placeholder=""
            type="date"
            isRequired={true}
            handleChange={changeHandler}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateStudent;

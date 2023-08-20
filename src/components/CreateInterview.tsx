import Input from "./Input/Input";
import { IInterview } from "../pages/Interviews";
import { useState, ChangeEvent } from "react";
import Modal from "./Modal/Modal";
import makeRequest from "../utils/makeRequest";

const initialState = {
  companyName: "",
  position: "",
  dateOfInterview: new Date(),
} satisfies IInterview;

interface IcreateInterviewProps {
  state: boolean;
  setState: (state: boolean) => void;
}

const CreateInterview = (props: IcreateInterviewProps) => {
  const [newInterviewState, setNewInterviewState] =
    useState<IInterview>(initialState);
  const [iseModalActive, setIsModalActive] = useState(props.state);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewInterviewState({
      ...newInterviewState,
      [e.target.name]: e.target.value,
    });
  };
  const closeHandler = () => {
    setIsModalActive(false);
    props.setState(false);
  };
  const submitHandler = async () => {
    const data = await makeRequest("/interview", {
      method: "POST",
      body: JSON.stringify(newInterviewState),
    });
    // TODO: Flashing message
    console.log('interview data', data);
    closeHandler();
  };
  return (
    <Modal
      submitHandler={submitHandler}
      isActive={iseModalActive}
      closeHandler={closeHandler}
      className="flex flex-col"
    >
      <div className="mb-4 flex-1">
        <h1 className="text-2xl text-center">Schedule new interview</h1>
        <div className="flex flex-col justify-center items-center mt-2 flex-auto">
          <Input
            id="company-name"
            labelFor="company-name"
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

export default CreateInterview;

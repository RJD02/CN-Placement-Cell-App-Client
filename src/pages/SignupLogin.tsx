import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import { storeToLocalStorage } from "../utils/getFromLocalStorage";
import makeRequest from "../utils/makeRequest";
import Layout from "./Layout";

interface IInputFields {
  labelText: string;
  labelFor: string;
  id: string;
  type: string;
  name: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
}

const fields: IInputFields[] = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "cpassword",
    id: "cpassword",
    name: "cpassword",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
  {
    labelText: "Batch",
    labelFor: "batch",
    id: "batch",
    name: "batch",
    type: "text",
    autoComplete: "batch",
    isRequired: true,
    placeholder: "batch",
  },
];

interface ISignupFields {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  batch: string;
  [index: string]: string;
}

interface IWarning {
  message: string;
  isActive: boolean;
}

export const Signup = () => {
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState<ISignupFields>({
    email: "",
    username: "",
    password: "",
    cpassword: "",
    batch: "",
  });
  const [warningState, setWarningState] = useState<IWarning>({
    message: "",
    isActive: false,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };
  async function submitHandler() {
    if (signupState.cpassword !== signupState.password) {
      setWarningState({
        isActive: true,
        message: "Password and confirm-password do not match",
      });
      return;
    }
    // const response = await fetch("http://localhost:8000/user/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //   }),
    // });
    // const data: ISignupAPIResponse = await response.json();
    const data = await makeRequest("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signupState.email,
        name: signupState.username,
        password: signupState.password,
        batch: signupState.batch,
      }),
    });
    storeToLocalStorage(data);
    navigate("/");
  }
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-100 mt-10  bg-zinc-200 text-primary w-1/2 mx-auto rounded">
        <h1 className="text-3xl mt-3 capitalize font-bold">Sign up</h1>
        <p className="mt-5">
          Already have an account? <a href="/login">Login</a>
        </p>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        {warningState.isActive && (
          <p className="text-red-500">{warningState.message}</p>
        )}
        <button onClick={submitHandler} className="mb-5">
          Submit
        </button>
      </div>
    </Layout>
  );
};

export const Login = () => {};

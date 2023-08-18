import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import { storeToLocalStorage } from "../utils/getFromLocalStorage";
import makeRequest from "../utils/makeRequest";
import Layout from "./Layout";
import { signupFields as signupInputFields } from "./inputFields";
import { loginFields as loginInputFields } from "./inputFields";
import IWarning from "../interfaces/warningInterface";
import { Link } from "react-router-dom";

interface ISignupFields {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  batch: string;
  [index: string]: string;
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {signupInputFields.map((field) => (
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

interface ILoginFields {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState<ILoginFields>({
    email: "",
    password: "",
  });
  const [warningState, setWarningState] = useState<IWarning>({
    message: "",
    isActive: false,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  async function submitHandler() {
    if (loginState.password === "" || loginState.email === "") {
      setWarningState({
        isActive: true,
        message: "Password and email cannot be empty",
      });
      return;
    }
    const data = await makeRequest("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginState.email,
        password: loginState.password,
      }),
    });
    console.log(data);
    if (!data.data) {
      setWarningState({ isActive: true, message: data.message });
      return;
    }
    storeToLocalStorage(data);
    navigate("/");
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-100 mt-10  bg-zinc-200 text-primary w-1/2 mx-auto rounded">
        <h1 className="text-3xl mt-3 capitalize font-bold">Sign up</h1>
        <p className="mt-5">
          Don't have an account? <Link className="underline" to="/signup">Signup</Link>
        </p>
        {loginInputFields.map((field) => (
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

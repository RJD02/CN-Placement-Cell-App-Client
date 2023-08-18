import { IInputFields } from "../interfaces/inputInterface";

export const signupFields: IInputFields[] = [
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

export const loginFields: IInputFields[] = [
    {
        labelText: 'Email-address',
        labelFor: 'email',
        id: 'email',
        name: 'email',
        type: 'email',
        autoComplete: 'email',
        isRequired: true,
        placeholder: 'Email address',
    },
    {
        labelText: 'Password',
        labelFor: 'password',
        id: 'password',
        name: 'password',
        type: 'password',
        autoComplete: 'current-password',
        isRequired: true,
        placeholder: 'Password',
    }
]

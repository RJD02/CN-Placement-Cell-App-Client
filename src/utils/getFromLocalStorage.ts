import { ISignupAPIResponse } from "../interfaces/signupInterface";

export const getFromLocalStorage = () => {
  const details = {
    isAdmin: "",
    email: "",
    id: "",
    name: "",
    isLoggedIn: false,
    token: "",
    isApproved: false,
  };
  if (localStorage.getItem("isAdmin") !== null) {
    details.isAdmin = localStorage.getItem("isAdmin") as string;
  }
  if (localStorage.getItem("email")) {
    details["email"] = localStorage.getItem("email") as string;
  }
  if (localStorage.getItem("id")) {
    details["id"] = localStorage.getItem("id") as string;
  }
  if (localStorage.getItem("name")) {
    details["name"] = localStorage.getItem("name") as string;
  }
  if (localStorage.getItem("isLoggedIn")) {
    details["isLoggedIn"] =
      parseInt(localStorage.getItem("isLoggedIn") as string) === 1
        ? true
        : false;
  }
  if (localStorage.getItem("token")) {
    details["token"] = localStorage.getItem("token") as string;
  }
  if (localStorage.getItem("isApproved")) {
    details["isApproved"] =
      parseInt(localStorage.getItem("isApproved") || "0") === 1 ? true : false;
  }
  return details;
};

export const storeToLocalStorage = (data: ISignupAPIResponse) => {
  localStorage.setItem("token", data.jsonToken);
  localStorage.setItem("id", data.data._id);
  localStorage.setItem("isAdmin", data.data.isAdmin ? "1" : "0");
  localStorage.setItem("email", data.data.email);
  localStorage.setItem("name", data.data.name);
  localStorage.setItem("isLoggedIn", "1");
  localStorage.setItem("isApproved", data.data.isApproved ? "1" : "0");
};

export const deleteFromLocalStorage = () => {
  localStorage.clear();
};

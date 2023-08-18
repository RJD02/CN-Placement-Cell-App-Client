import IAPIResponse from "../interfaces/apiInterface";
import { ISignupAPIResponse } from "../interfaces/signupInterface";

export const getFromLocalStorage = () => {
  const details = { isAdmin: "", email: "", id: "", name: "" , isLoggedIn: false};
  console.log('get from local storage', details);
  if (localStorage.getItem("isAdmin") !== null) {
      details.isAdmin = localStorage.getItem('isAdmin') as string;
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
  if(localStorage.getItem('isLoggedIn')) {
      details['isLoggedIn'] = parseInt(localStorage.getItem('isLoggedIn') as string) === 1 ? true: false;
  }
  return details
};

export const storeToLocalStorage = (data: ISignupAPIResponse) => {
    localStorage.setItem("token", data.jsonToken);
    localStorage.setItem('id', data.data._id);
    localStorage.setItem('isAdmin', data.data.isAdmin ? '1' : '0');
    localStorage.setItem('email', data.data.email);
    localStorage.setItem('name', data.data.name);
    localStorage.setItem('isLoggedIn', '1');
}

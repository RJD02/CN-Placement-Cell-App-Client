import { getFromLocalStorage } from "./getFromLocalStorage";

const makeRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const details = getFromLocalStorage();
    const response = await fetch("http://localhost:8000" + url, {
      ...options,
      headers: { Authorization: `Bearer ${details.token}` },
    });
    if (response.status !== 200) return null;
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("error");
    return null;
  }
};

export default makeRequest;

import {  useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  return async (url: string, options: RequestInit) => {
    const fetchApi = async () => {
      const response = await fetch("http://localhost:8000" + url, options);
      const data = await response.json();
      setLoading(false);
      setData(data);
    };
    await fetchApi();
    return { loading, data };
  };
};

export default useApi;

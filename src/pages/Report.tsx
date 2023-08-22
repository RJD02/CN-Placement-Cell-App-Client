import { useEffect } from "react";
import makeRequest from "../utils/makeRequest";
const Report = () => {
  useEffect(() => {
    const downloadStudentData = async () => {
      const response = await fetch("http://localhost:8000/result/download");
      const blob = await response.blob();
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "student-report.csv";
      a.click();
    };
  });
};

export default Report;

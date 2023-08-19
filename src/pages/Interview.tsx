import { useParams } from "react-router-dom";

const Interview = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Hello World</div>;
};

export default Interview;

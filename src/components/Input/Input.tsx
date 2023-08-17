import { inputProps } from "../../interfaces/inputInterface";

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

const Input = (props: inputProps) => {
  return (
    <div className="my-5 w-3/4 ">
      <label htmlFor={props.labelFor} className="sr-only">
        {props.labelText}
      </label>
      <input
        onChange={props.handleChange}
        value={props?.value}
        id={props.id}
        name={props.name}
        type={props.type}
        required={props.isRequired}
        placeholder={props.placeholder}
        className={fixedInputClass + props?.className}
      />
    </div>
  );
};
export default Input;

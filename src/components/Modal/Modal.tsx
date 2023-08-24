import { ReactNode } from "react";

interface ModalProps {
  isActive: boolean;
  closeHandler: () => void;
  children: ReactNode;
  className?: string;
  submitHandler: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <div
      onClick={props.closeHandler}
      className={`modal fixed ${
        props.isActive ? "" : "hidden"
      } inset-0 bg-gray-400 bg-opacity-50 overflow-y-auto h-screen w-screen flex items-center justify-center `}
    >
      <div
        className={"bg-white z-100 p-7 w-1/2 h-3/4 " + props.className}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <div className="btns flex justify-evenly ">
          <button className="close" onClick={props.closeHandler}>
            Close
          </button>
          <button className="submit" onClick={props.submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

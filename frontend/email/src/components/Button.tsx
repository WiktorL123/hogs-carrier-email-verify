/* 
EXAMPLE USE:
<Button onClick={...}>label</Button>
<Button variant="secondary" size="SM" onClick={...}>label</Button>
<Button variant="secondary" size="SM" onClick={...} disabled>label</Button> //disabled overrides styles and disables onClick
<TruckButton />
<TruckButton raw />
*/

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "MD" | "SM";
  variant?: "primary" | "secondary";
  children: string;
}

interface TruckButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  raw?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  size = "MD",
  variant = "primary",
  ...props
}) => {
  let style: string;
  if (disabled) {
    style = `bg-medium text-base-900 rounded-[0.4rem] ${
      size === "MD" ? `px-[5.75rem] py-[1.1rem]` : `px-[1.95rem] py-[0.6rem]`
    } poppins-12-600`;
  } else {
    switch (variant) {
      case "primary":
        style = `bg-mainAccent-blue text-base-200 rounded-[0.4rem] ${
          size === "MD"
            ? `px-[5.75rem] py-[1.1rem]`
            : `px-[1.95rem] py-[0.6rem]`
        } poppins-12-600 hover:bg-primary-500 transition-all duration-200 ease-out cursor-pointer 
        active:bg-primary-500 active:transition-all active:duration-75 active:ease-in-out`;
        break;
      case "secondary":
        style = `bg-base-100 text-primary-500 rounded-[0.4rem] ${
          size === "MD"
            ? `px-[5.75rem] py-[1.1rem]`
            : `px-[1.95rem] py-[0.6rem]`
        } poppins-12-600 hover:bg-primary-500 hover:text-base-200 transition-all duration-200 ease-out cursor-pointer 
        active:bg-primary-600 active:transition-all active:duration-75 active:ease-in-out`;
        break;
    }
  }
  return (
    <button
      {...props}
      className={`${style} ${props.className ?? ""}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const AddButton = ({ ...props }) => {
  return (
    <button
      className={`w-[1.4rem] h-[1.4rem] rounded-full bg-success-400 hover:bg-success-500 transition-all duration-200 flex flex-shrink-0 justify-center items-center cursor-pointer ${
        props.className ?? ``
      }`}
    >
      <div className="w-[0.8rem] h-[0.8rem] relative flex justify-center items-center">
        <div className="w-[0.2rem] h-[0.8rem] rounded-full bg-base-300 absolute left-[0.3rem]" />
        <div className="w-[0.8rem] h-[0.2rem] rounded-full bg-base-300" />
      </div>
    </button>
  );
};

export const RemoveButton = ({ ...props }) => {
  return (
    <button
      className={`w-[1.4rem] h-[1.4rem] rounded-full bg-warning-400 hover:bg-warning-500 transition-all duration-200 flex flex-shrink-0 justify-center items-center cursor-pointer ${
        props.className ?? ``
      }`}
    >
      <div className="w-[0.8rem] h-[0.2rem] rounded-full bg-base-300" />
    </button>
  );
};

export const TruckButton: React.FC<TruckButtonProps> = ({
  raw,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`group cursor-pointer w-[28.5rem] h-[8rem] relative ${
        props.className ?? ``
      }`}
    >
      <div
        className={`w-[22.3rem] h-[5rem] rounded-[0.8rem] absolute left-0 bottom-[2.6rem] transition-[bottom] group-active:bottom-[2.9rem] ${
          !raw
            ? `bg-primary-500 group-hover:bg-primary-600 transition-colors`
            : `border-dark border-4`
        }`}
      >
        {!raw && (
          <div className="poppins-14-600 text-base-200 mt-5">View details</div>
        )}
      </div>
      <div className="w-fit mt-[0.6rem] absolute bottom-[1.7rem] left-[22.9rem] z-10 origin-bottom-right transform transition-[transform, bottom] duration-150 group-hover:rotate-12 group-hover:bottom-[1.65rem]">
        <svg
          width="41"
          height="52"
          viewBox="0 0 41 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.5 32L17.5 28L15.5 26V14H32.5M2 5V38.5L4 41C9.16667 39.5 20.9 39.2 26.5 50H38C38.6667 43.6667 38.1 25.6 30.5 4L28.5 2.5H4L2 5Z"
            className="stroke-dark-600"
            strokeWidth="4"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0">
        <svg
          width="269"
          height="24"
          viewBox="0 0 269 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M84 14V5.5V5H155.476L163 8.5V17H90.2698L84 14Z"
            className="stroke-dark-600"
            strokeWidth="4"
          />
          <path
            d="M200 14V5.5V5H221.714L224 8.5V17H201.905L200 14Z"
            className="stroke-dark-600"
            strokeWidth="4"
          />
          <path
            d="M2 14V5.5V5H21.9048L24 8.5V17H3.74603L2 14Z"
            className="stroke-dark-600"
            strokeWidth="4"
          />
          <path
            d="M267 6V13.5L264.5 16.5H249.5"
            className="stroke-dark-600"
            strokeWidth="4"
          />
          <path
            d="M251.5 12C251.5 18.3513 246.351 23.5 240 23.5C233.649 23.5 228.5 18.3513 228.5 12C228.5 5.64873 233.649 0.5 240 0.5C246.351 0.5 251.5 5.64873 251.5 12ZM233.282 12C233.282 15.7103 236.29 18.7181 240 18.7181C243.71 18.7181 246.718 15.7103 246.718 12C246.718 8.28972 243.71 5.28194 240 5.28194C236.29 5.28194 233.282 8.28972 233.282 12Z"
            className="fill-dark-600"
          />
          <path
            d="M195 12C195 18.3513 189.851 23.5 183.5 23.5C177.149 23.5 172 18.3513 172 12C172 5.64873 177.149 0.5 183.5 0.5C189.851 0.5 195 5.64873 195 12ZM176.782 12C176.782 15.7103 179.79 18.7181 183.5 18.7181C187.21 18.7181 190.218 15.7103 190.218 12C190.218 8.28972 187.21 5.28194 183.5 5.28194C179.79 5.28194 176.782 8.28972 176.782 12Z"
            className="fill-dark-600"
          />
          <path
            d="M78 12C78 18.3513 72.8513 23.5 66.5 23.5C60.1487 23.5 55 18.3513 55 12C55 5.64873 60.1487 0.5 66.5 0.5C72.8513 0.5 78 5.64873 78 12ZM59.7819 12C59.7819 15.7103 62.7897 18.7181 66.5 18.7181C70.2103 18.7181 73.2181 15.7103 73.2181 12C73.2181 8.28972 70.2103 5.28194 66.5 5.28194C62.7897 5.28194 59.7819 8.28972 59.7819 12Z"
            className="fill-dark-600"
          />
          <path
            d="M53 12C53 18.3513 47.8513 23.5 41.5 23.5C35.1487 23.5 30 18.3513 30 12C30 5.64873 35.1487 0.5 41.5 0.5C47.8513 0.5 53 5.64873 53 12ZM34.7819 12C34.7819 15.7103 37.7897 18.7181 41.5 18.7181C45.2103 18.7181 48.2181 15.7103 48.2181 12C48.2181 8.28972 45.2103 5.28194 41.5 5.28194C37.7897 5.28194 34.7819 8.28972 34.7819 12Z"
            className="fill-dark-600"
          />
        </svg>
      </div>
    </button>
  );
};

export default Button;

"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useContext, forwardRef } from "react";
import { Label } from "./Label";
import { ThemeContext } from "@/context/ThemeContext";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  variant?: "input" | "search";
  placeholder: string;
  valid?: boolean;
  label?: string;
  errorMessage?: string;
  inputLength?: number;
  inputLengthMax?: number;
}

export const Input = forwardRef(function Input(
  {
    variant = "input",
    placeholder,
    valid,
    label,
    errorMessage,
    inputLength,
    inputLengthMax,
    id,
    required,
    ...props
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const context = useContext(ThemeContext);

  if (!context) {
    return (
      <header className="h-[8vh] bg-base-200 px-md xs:px-3xl py-md flex justify-between opacity-0" />
    );
  }

  const { theme } = context;

  return (
    <div className="inline-flex flex-col gap-3xs w-full">
      {label && (
        <div>
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        </div>
      )}
      <div
        className={`
          group inline-flex items-center
          bg-input-bg
          hover:border-inputBorderHover-bg 
          focus-within:border-inputBorderHover-bg
          ${
            theme === "light" ? "border-[0.2rem]" : "border-[0.2rem]"
          } border-solid
          ${variant === "input" ? " rounded-[0.4rem] border-input-border" : ""}
          ${variant === "search" ? " rounded-[3.5rem] border-input-border" : ""}
        `}
      >
        <input
          {...props}
          ref={ref}
          id={id}
          placeholder={placeholder}
          className={`
            flex-1 bg-transparent outline-none border-none
            figtree-14-400 tracking-wide text-input-text
            placeholder-figtree-14-400 placeholder:tracking-wide placeholder:text-input-placeholder
            ${variant === "input" ? "p-sm" : ""}       
            ${variant === "search" ? "py-sm pl-lg" : ""}       
          `}
        />

        {variant === "search" && (
          <button
            type="submit"
            className="pr-lg cursor-pointer group-hover:text-input-text group-focus-within:text-input-text"
          >
            <MagnifyingGlassIcon
              className={`w-lg h-lg ${valid ? "text-mainAccent-purple scale-100" : "text-medium scale-75"} transition-transform`}
            />
          </button>
        )}
      </div>

      <p
        className={`flex justify-end px-3xl h-xs ${inputLength === inputLengthMax ? "text-danger-500" : "text-warning-500"}`}
      >
        {inputLengthMax && inputLength && 0.7 * inputLengthMax < inputLength
          ? inputLength + "/" + inputLengthMax
          : ""}
      </p>
      <p className="w-full h-2xl flex items-center justify-center text-danger-500 figtree-14-600">
        {errorMessage !== undefined ? errorMessage : ""}
      </p>
    </div>
  );
});

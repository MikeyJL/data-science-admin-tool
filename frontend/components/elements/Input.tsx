import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import { Txt } from "./Txt";

export interface ValidationMap {
  [key: string]: RegisterOptions;
}

type InputProps = {
  /** The name identifier of the input, it must match the type of the form data. */
  name: string;
  /** Registers the input with react-hook-form. */
  form: UseFormReturn<any, any>;
  /** Input validation schema. */
  validation?: ValidationMap;
  /** Styles for the input container. */
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "form">;

/** Generic styled input element. */
export const Input = ({
  name,
  form,
  validation,
  className,
  ...props
}: InputProps) => {
  const errorMessage = form.formState.errors[name]?.message;

  return (
    <div className={className}>
      <input
        className="border-2 rounded-lg bg-transparent w-full px-4 py-2"
        {...form.register(name, validation && validation[name])}
        {...props}
      />
      {errorMessage && (
        <Txt className="text-red-700">{errorMessage.toString()}</Txt>
      )}
    </div>
  );
};

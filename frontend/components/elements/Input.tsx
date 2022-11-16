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
};

/** Generic styled input element. */
export const Input = ({ name, form, validation }: InputProps) => {
  const errorMessage = form.formState.errors[name]?.message;

  return (
    <div>
      <input
        className="border-2 rounded-lg bg-transparent w-full px-4 py-2"
        {...form.register(name, validation && validation[name])}
      />
      {errorMessage && (
        <Txt className="text-red-700">{errorMessage.toString()}</Txt>
      )}
    </div>
  );
};

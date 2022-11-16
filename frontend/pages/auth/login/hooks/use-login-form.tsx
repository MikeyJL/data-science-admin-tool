import { useForm, UseFormReturn } from "react-hook-form";
import { ValidationMap } from "../../../../components/elements";
import { EMAIL_REGEX } from "../../../../helpers";

export type LoginFormData = {
  email: string;
  password: string;
};

type UseLoginFormReturn = {
  form: UseFormReturn<LoginFormData, any>;
  validation: ValidationMap;
};

/** Contains form logic to log in with user credentials. */
const useLoginForm = (): UseLoginFormReturn => {
  const form = useForm<LoginFormData>();

  const validation = {
    email: {
      required: {
        value: true,
        message: "Email is required.",
      },
      pattern: {
        value: EMAIL_REGEX,
        message: "You must use a valid email address.",
      },
    },
    password: {
      required: {
        value: true,
        message: "You must enter your password.",
      },
      minLength: {
        value: 8,
        message: "Minimum of 8 characters.",
      },
    },
  };

  return { form, validation };
};

export default useLoginForm;

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Input, PrimaryButton, Txt } from "../../../components/elements";
import { axiosClient } from "../../../helpers";
import { useMainContext } from "../../main.provider";
import useLoginForm, { LoginFormData } from "./hooks/use-login-form";

const LoginPage = () => {
  // Provider
  const { setIsLoggedIn } = useMainContext();

  // Router
  const navigate = useNavigate();

  // Form
  const { form, validation } = useLoginForm();
  const { handleSubmit } = form;

  // Mutation
  const { mutate } = useMutation<
    unknown,
    unknown,
    { username: string; password: string }
  >(
    async ({ username, password }) =>
      await axiosClient.post(
        "/auth/login",
        JSON.stringify({
          username,
          password,
        })
      ),
    {
      onSuccess: () => {
        setIsLoggedIn(true);
      },
      onError: (e) => {
        const error = e as AxiosError<{ detail: string }>;

        // Navigates to confirm sign-up
        if (
          error.response?.status === 403 &&
          error.response?.data.detail === "Need verification"
        ) {
          navigate("/404");
        }
      },
    }
  );

  /** Signs in the user. */
  const handleLogin = ({ email: username, password }: LoginFormData) => {
    mutate({
      username,
      password,
    });
  };

  return (
    <>
      {/* Heading */}
      <Txt type="title" className="mb-4">
        Log in
      </Txt>

      <form className="grid gap-4 w-1/3" onSubmit={handleSubmit(handleLogin)}>
        <Input
          name="email"
          type="email"
          placeholder="Enter email..."
          form={form}
          validation={validation}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter password..."
          form={form}
          validation={validation}
        />
        <PrimaryButton type="submit">Log in</PrimaryButton>
      </form>
    </>
  );
};

export default LoginPage;

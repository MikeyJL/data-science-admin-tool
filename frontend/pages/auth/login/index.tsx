import { useMutation } from "@tanstack/react-query";
import { Input, PrimaryButton, Txt } from "../../../components/elements";
import { axiosClient } from "../../../helpers";
import { useMainContext } from "../../main.provider";
import useLoginForm, { LoginFormData } from "./hooks/use-login-form";

const LoginPage = () => {
  // Provider
  const { setIsLoggedIn } = useMainContext();

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

      <div className="grid gap-4 w-1/3">
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
        <PrimaryButton label="Log in" onClick={handleSubmit(handleLogin)} />
      </div>
    </>
  );
};

export default LoginPage;

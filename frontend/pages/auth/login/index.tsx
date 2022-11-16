import { Input, PrimaryButton, Txt } from "../../../components/elements";
import useLoginForm, { LoginFormData } from "./hooks/use-login-form";

const LoginPage = () => {
  // Form
  const { form, validation } = useLoginForm();
  const { handleSubmit } = form;

  const handleLogin = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <>
      {/* Heading */}
      <Txt type="title" className="mb-4">
        Log in
      </Txt>

      <div className="grid gap-4 w-1/3">
        <Input name="email" form={form} validation={validation} />
        <Input name="password" form={form} validation={validation} />
        <PrimaryButton label="Log in" onClick={handleSubmit(handleLogin)} />
      </div>
    </>
  );
};

export default LoginPage;

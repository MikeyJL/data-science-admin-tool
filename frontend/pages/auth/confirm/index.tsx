import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, PrimaryButton, Txt } from "../../../components/elements";
import { axiosClient } from "../../../helpers";

type EmailVerificationData = {
  code: string;
};

const ConfirmPage = () => {
  // Router
  const navigate = useNavigate();

  // Form
  const form = useForm<EmailVerificationData>();
  const { handleSubmit } = form;

  const validation = {
    code: {
      required: {
        value: true,
        message: "Code is required.",
      },
      pattern: {
        value: /^[0-9]{6}$/g,
        message: "You must enter the 6-digit code.",
      },
    },
  };

  // Query params
  const query = new URLSearchParams(window.location.search);
  const username = query.get("username");

  // Mutations
  const { mutate: sendCode, isLoading: sendCodeLoading } = useMutation(
    async () => await axiosClient.get(`/auth/verify-email?username=${username}`)
  );
  const { mutate: confirmCode, isLoading: confirmCodeLoading } = useMutation<
    unknown,
    unknown,
    { username: string; code: string }
  >(
    async (data) =>
      await axiosClient.post("/auth/verify-email", JSON.stringify(data), {
        headers: {
          "X-CSRFTOKEN": document.cookie.match(/csrftoken=(.*)/)?.[1],
        },
      }),
    {
      onSuccess: () => {
        navigate("/login");
      },
    }
  );

  /** Sends a new code to the user. */
  const handleSendCode = () => {
    sendCode();
  };

  /** Confirms the sign-up. */
  const handleConfirmCode = ({ code }: EmailVerificationData) => {
    if (!username) return;

    confirmCode({
      username,
      code,
    });
  };

  return (
    <>
      {/* Heading */}
      <Txt type="title" className="mb-4">
        Confirm Sign up
      </Txt>

      <form
        onSubmit={handleSubmit(handleConfirmCode)}
        className="grid gap-4 mt-8 w-1/4"
      >
        <Input
          name="code"
          placeholder="Enter verification code..."
          form={form}
          validation={validation}
        />
        <PrimaryButton type="submit">
          {confirmCodeLoading ? "Loading..." : "Confirm"}
        </PrimaryButton>
        <PrimaryButton onClick={handleSendCode} type="button">
          {sendCodeLoading ? "Loading..." : "Resend Code"}
        </PrimaryButton>
      </form>
    </>
  );
};

export default ConfirmPage;

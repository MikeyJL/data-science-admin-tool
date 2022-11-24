import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, PrimaryButton, Txt } from "../../components/elements";
import { LoadingWrapper } from "../../components/generic";
import { axiosClient } from "../../helpers";
import { User } from "../../types";
import { useMainContext } from "../main.provider";

type EmailVerificationData = {
  code: string;
};

const ProfilePage = () => {
  const [sentVerification, setSentVerification] = useState<boolean>(false);

  // Provider
  const { setIsLoggedIn } = useMainContext();

  console.log();

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

  // Query
  const { data, isLoading } = useQuery<User>(["user"], ({ signal }) =>
    axiosClient
      .get("auth/user", {
        signal,
      })
      .then((res) => res.data)
  );

  // Mutations
  const { mutate: logout } = useMutation(
    async () => await axiosClient.get("/auth/logout"),
    {
      onSuccess: () => {
        setIsLoggedIn(false);
        navigate("/");
      },
    }
  );
  const { mutate: sendVerification, isLoading: sendVerificationLoading } =
    useMutation(async () => await axiosClient.get("/auth/verify-email"), {
      onSuccess: () => {
        setSentVerification(true);
      },
    });
  const { mutate: confirmCode, isLoading: confirmCodeLoading } = useMutation<
    unknown,
    unknown,
    { code: string }
  >(
    async ({ code }) =>
      await axiosClient.post(
        "/auth/verify-email",
        JSON.stringify({
          code,
        }),
        {
          headers: {
            "X-CSRFTOKEN": document.cookie.match(/csrftoken=(.*)/)?.[1],
          },
        }
      ),
    {
      onSuccess: () => {
        setSentVerification(true);
      },
    }
  );

  /** Logs the user out of the app. */
  const handleLogout = () => {
    logout();
  };

  /** Sends an email verification. */
  const handleSendVerification = () => {
    sendVerification();
  };

  /** Confirms the sign-up. */
  const handleConfirmCode = ({ code }: EmailVerificationData) => {
    confirmCode({
      code,
    });
  };

  return (
    <>
      <Txt type="title" className="mb-4">
        Profile
      </Txt>

      <LoadingWrapper isLoading={isLoading}>
        {data && (
          <div className="grid grid-cols-2">
            {/* General */}
            <div>
              <Txt>
                <b>Email:</b> {data.email}
              </Txt>
              <Txt>
                <b>Last Login:</b> {new Date(data.last_login).toLocaleString()}
              </Txt>
            </div>

            {/* Access */}
            <div>
              {/* Email verified */}
              <Txt className="font-bold">
                Email verified:{" "}
                <span
                  className={
                    data.email_verified ? "text-green-500" : "text-red-500"
                  }
                >
                  {data.email_verified ? "YES" : "NO"}
                </span>
              </Txt>

              {/* Is admin */}
              <Txt className="font-bold">
                Admin:{" "}
                <span
                  className={data.is_admin ? "text-green-500" : "text-red-500"}
                >
                  {data.is_admin ? "YES" : "NO"}
                </span>
              </Txt>
            </div>
          </div>
        )}
      </LoadingWrapper>

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
      </form>

      <div className="flex items-center justify-end mt-8">
        <PrimaryButton
          onClick={handleSendVerification}
          disabled={sendVerificationLoading || sentVerification}
          className="mr-4"
        >
          {sendVerificationLoading
            ? "Sending..."
            : sentVerification
            ? "Sent"
            : "Send Email Verification"}
        </PrimaryButton>
        <PrimaryButton onClick={handleLogout}>Log out</PrimaryButton>
      </div>
    </>
  );
};

export default ProfilePage;

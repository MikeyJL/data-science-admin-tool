import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, Txt } from "../../components/elements";
import { LoadingWrapper } from "../../components/generic";
import { axiosClient } from "../../helpers";
import { User } from "../../types";
import { useMainContext } from "../main.provider";

const ProfilePage = () => {
  // Provider
  const { setIsLoggedIn } = useMainContext();

  // Router
  const navigate = useNavigate();

  // Query
  const { data, isLoading } = useQuery<User>(["user"], ({ signal }) =>
    axiosClient
      .get("auth/user", {
        signal,
      })
      .then((res) => res.data)
  );

  // Mutation
  const { mutate: logout } = useMutation(
    async () => await axiosClient.get("/auth/logout"),
    {
      onSuccess: () => {
        setIsLoggedIn(false);
        navigate("/");
      },
    }
  );

  /** Logs the user out of the app. */
  const handleLogout = () => {
    logout();
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

      <div className="flex items-center justify-end mt-8">
        <PrimaryButton onClick={handleLogout}>Log out</PrimaryButton>
      </div>
    </>
  );
};

export default ProfilePage;

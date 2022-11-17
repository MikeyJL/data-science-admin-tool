import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, Txt } from "../../components/elements";
import { axiosClient } from "../../helpers";
import { useMainContext } from "../main.provider";

const ProfilePage = () => {
  // Provider
  const { setIsLoggedIn } = useMainContext();

  // Router
  const navigate = useNavigate();

  // Mutation
  const { mutate } = useMutation(
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
    mutate();
  };

  return (
    <>
      <Txt type="title" className="mb-4">
        Profile
      </Txt>

      <PrimaryButton onClick={handleLogout}>Log out</PrimaryButton>
    </>
  );
};

export default ProfilePage;

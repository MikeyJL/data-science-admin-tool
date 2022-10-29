import { useNavigate } from "react-router-dom";
import { PrimaryButton, Txt } from "../../components/elements";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Txt type="title">Profile Page</Txt>
      <PrimaryButton label="Got to Home" onClick={() => navigate("/")} />
    </div>
  );
};

export default ProfilePage;

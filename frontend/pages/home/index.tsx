import { useNavigate } from "react-router-dom";
import { PrimaryButton, Txt } from "../../components/elements";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Txt type="title">Home Page</Txt>
      <PrimaryButton
        label="Got to Profile"
        onClick={() => navigate("/profile")}
      />
    </div>
  );
};

export default HomePage;

import { useNavigate } from "react-router-dom";
import { Txt } from "../../components/elements";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Txt type="title">Home Page</Txt>
			<button onClick={() => navigate("/profile")}>Profile</button>
		</div>
	);
};

export default HomePage;

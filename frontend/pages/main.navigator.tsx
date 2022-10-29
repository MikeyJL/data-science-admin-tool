import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home";
import ProfilePage from "./profile";

const MainNavigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigator;

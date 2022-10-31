import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/extensive";
import HomePage from "./home";
import ProfilePage from "./profile";

const MainNavigator = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className="container mx-auto">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default MainNavigator;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/extensive";
import LoginPage from "./auth/login";
import SignUpPage from "./auth/sign-up";
import HomePage from "./home";
import { useMainContext } from "./main.provider";
import NotFoundPage from "./not-found";
import ProfilePage from "./profile";

const MainNavigator = () => {
  // Provider
  const { isLoggedIn } = useMainContext();

  return (
    <BrowserRouter>
      <main className="container mx-auto px-5">
        <Header />

        <Routes>
          {isLoggedIn ? (
            <>
              <Route index element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
            </>
          ) : (
            <>
              <Route index element={<LoginPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default MainNavigator;

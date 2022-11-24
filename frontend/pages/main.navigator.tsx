import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/extensive";
import ConfirmPage from "./auth/confirm";
import LoginPage from "./auth/login";
import HomePage from "./home";
import { useMainContext } from "./main.provider";
import NotFoundPage from "./not-found";
import ProfilePage from "./profile";
import ProjectPage from "./project";

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
              <Route path="projects">
                <Route path=":id" element={<ProjectPage />} />
              </Route>
            </>
          ) : (
            <>
              <Route index element={<LoginPage />} />
              <Route path="confirm" element={<ConfirmPage />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default MainNavigator;

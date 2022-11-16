import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainNavigator from "./pages/main.navigator";
import MainProvider from "./pages/main.provider";

const queryClient = new QueryClient();

/** Main entry of app. */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <MainNavigator />
      </MainProvider>
    </QueryClientProvider>
  );
};

export default App;

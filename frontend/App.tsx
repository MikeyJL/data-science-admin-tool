import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainNavigator from "./pages/main.navigator";

const queryClient = new QueryClient();

/** Main entry of app. */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigator />
    </QueryClientProvider>
  );
};

export default App;

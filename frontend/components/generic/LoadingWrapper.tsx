import { ReactNode } from "react";

type LoadingWrapperProps = {
  isLoading: boolean;
  children: ReactNode;
};

/** Shows loading state if truthy, else, show elements. */
export const LoadingWrapper = ({
  isLoading,
  children,
}: LoadingWrapperProps) => {
  if (isLoading) return <p>Loading...</p>;

  return <>{children}</>;
};

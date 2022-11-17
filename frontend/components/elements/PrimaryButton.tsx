import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  // Styling
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Primary styled button. */
export const PrimaryButton = ({
  children,
  onClick,
  className = "",
  fullWidth,
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-4 py-2 bg-blue-800 text-white rounded-xl hover:opacity-80 transition-opacity",
        {
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

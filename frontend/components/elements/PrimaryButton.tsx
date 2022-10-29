import classNames from "classnames";

type PrimaryButtonProps = {
  label: string;
  onClick: () => void;
  // Styling
  className?: string;
  fullWidth?: boolean;
};

/** Primary styled button. */
export const PrimaryButton = ({
  label,
  onClick,
  className = "",
  fullWidth,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-4 py-2 bg-blue-800 text-white rounded-xl",
        {
          "w-full": fullWidth,
        },
        className
      )}
    >
      {label}
    </button>
  );
};

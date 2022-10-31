import classNames from "classnames";
import { ReactNode } from "react";

export type TxtType = "title" | "subtitle" | "body";

type TxtProps = {
  children: ReactNode;
  type?: TxtType;
  className?: string;
};

/** Generic text component. */
export const Txt = ({ children, type = "body", className = "" }: TxtProps) => {
  switch (type) {
    case "title":
      return (
        <h1 className={classNames("text-2xl font-bold", className)}>
          {children}
        </h1>
      );
    case "subtitle":
      return (
        <h2
          className={classNames("text-lg uppercase font-semibold", className)}
        >
          {children}
        </h2>
      );
    default:
      return <p className={className}>{children}</p>;
  }
};

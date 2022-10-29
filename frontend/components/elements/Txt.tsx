import { ReactNode } from "react";

export type TxtType = "title" | "subtitle" | "body";

type TxtProps = {
	children: ReactNode;
	type?: TxtType;
};

/** Generic text component. */
export const Txt = ({ children, type = "body" }: TxtProps) => {
	switch (type) {
		case "title":
			return <h1 className="text-2xl font-bold">{children}</h1>;
		case "subtitle":
			return <h2 className="text-xl">{children}</h2>;
		default:
			return <p>{children}</p>;
	}
};

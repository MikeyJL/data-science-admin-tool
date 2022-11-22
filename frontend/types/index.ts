export * from "./projects";

export type User = {
  id: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
};

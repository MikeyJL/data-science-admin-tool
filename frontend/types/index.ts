export * from "./projects";

export type User = {
  id: string;
  email: string;
  email_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
  last_login: string;
};

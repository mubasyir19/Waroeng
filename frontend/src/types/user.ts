export interface FormLogin {
  username: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "ADMIN" | "STAFF";
}

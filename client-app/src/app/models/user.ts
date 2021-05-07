export interface User {
  userName: string;
  displayName: string;
  token: string;
  image?: string;
}

export interface UserFormValues {
  displayName?: string;
  userName?: string;
  email: string;
  password: string;
}

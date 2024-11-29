import {Login} from "./login.model";

export interface Register extends Login {
  confirmPassword: string;
}

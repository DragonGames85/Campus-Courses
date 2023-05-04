import { rolesState } from "./rolesState";

export interface profileState {
  fullName: string;
  email: string;
  birthDate: string;
  roles: rolesState;
}

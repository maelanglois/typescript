import { User } from "./User";

let connected: User;

export function setUser(user: User): void {
    connected = user;
}

export function getUser(): User {
    return connected;
}
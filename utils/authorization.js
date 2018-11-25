import { getToken } from "../storage";

export const getUserRole = (token = getToken()) => ('admin')
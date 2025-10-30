import { postApi } from "./api";

export const postRegister = async (data) => postApi("v1/admin/user/register", data)
export const postLogin = async (data) => postApi("v1/admin/user/login", data)
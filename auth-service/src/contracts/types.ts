import { RequestHandler } from "express";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  image_url: string;
  email: string;
  password: string;
  verified: boolean;
  user_plan: string;
}

export type UserRegister = Pick<
  User,
  "firstname" | "lastname" | "email" | "password"
>;

export type UserRes = Omit<User, "password">;

export type UserUpdateData = Pick<User, "firstname" | "lastname" | "password">;

export interface UserCacheData {
  username: string;
  email: string;
  verified: string;
  plan_token: string;
  user_token: string;
}

type withError<T> = T & { error: string };
export type myHandler<ReqBody, ResBody> = RequestHandler<
  string,
  Partial<withError<ResBody>>,
  Partial<ReqBody>
>;
export type myHandlerWithParam<Param, ReqBody, ResBody> = RequestHandler<
  Partial<Param>,
  Partial<withError<ResBody>>,
  Partial<ReqBody>
>;

export interface JwtPayload {
  userId: string;
  verified: boolean;
}

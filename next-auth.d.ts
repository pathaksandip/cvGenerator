/** @format */

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      stores?: string;
      email: string;
      name: string;
      role?: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    email: string;
    password: string;
    masterStore?: string;
    stores?: string;
    employeeid?: string;
    adminId?: string;
    role?: string;
    isVerified?: Boolean;
    isRejected?: Boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: string;
    id?: string;
    stores?: string;
  }
}

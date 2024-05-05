/** @format */

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    id?: string;
    password: string;
    userId: string;
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
    stores?: string;
  }
}

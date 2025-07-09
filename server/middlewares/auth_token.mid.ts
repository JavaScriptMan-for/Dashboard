import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

const JWT_KEY = process.env.JWT_KEY || "";

export interface JwtUserType {
  userId: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string
}

export const auth_token: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
   return void res.status(401).json({ message: "Вы не авторизованы" });
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Вы не авторизованы" });
    }

    if (typeof decoded === "object" && decoded !== null) {
      res.locals.user = decoded as JwtUserType;
      return next();
    }

    return res.status(401).json({ message: "Неверный токен" });
  });
}
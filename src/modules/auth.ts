import jwt from "jsonwebtoken";

interface IUser {
  id: string;
  username: string;
}

export const createJWT = (user: IUser) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET!
  );

  return token;
};

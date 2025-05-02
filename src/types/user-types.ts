import { ObjectId } from "mongoose";

export type User = {
  id: ObjectId;
  avatar: string;
  username: string;
  password: string;
};

import { ObjectId } from "mongoose";

export type User = {
  _id: ObjectId;
  avatar: string;
  username: string;
  password: string;
};

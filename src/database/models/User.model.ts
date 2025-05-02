import { User } from "@/types/user-types";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<User>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const UserModel = model<User>("users", UserSchema, "Users");

export default UserModel;

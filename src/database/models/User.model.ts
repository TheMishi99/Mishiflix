import { User } from "@/types/user-types";
import { model, Schema } from "mongoose";

const UserSchema = new Schema<User>({
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
},{
  collection: "Users",
});

const UserModel = model<User>("users", UserSchema);

export default UserModel;

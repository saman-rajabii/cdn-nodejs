import mongoose from "../connections/mongodb";

const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  lastLogin?: Date;
  active?: boolean;
}

const User = new Schema(
  {
    username: { type: String, required: true, index: true },
    password: { type: String, required: true },
    lastLogin: { type: Date },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", User);

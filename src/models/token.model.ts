import mongoose from "../connections/mongodb";

const { Schema } = mongoose;

export interface IToken extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  token: string;
}

const Token = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, index: true },
    token: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model<IToken>("Token", Token);

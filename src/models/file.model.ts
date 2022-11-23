import mongoose from "../connections/mongodb";

const { Schema } = mongoose;

export interface IFile extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  size: number;
  type: string;
  minifyDuration: number;
  memoryConsumption: number;
  deletedAt?: Date;
}

const File = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, index: true },
    name: { type: String, required: true, index: true },
    size: { type: Number, required: true },
    type: { type: String, required: true, index: true },
    minifyDuration: { type: Number },
    memoryConsumption: { type: Number },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IFile>("File", File);

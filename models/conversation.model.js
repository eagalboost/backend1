import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    readByAdmin: {
      type: Boolean,
      default: false,
    },
    readByBuyer: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);

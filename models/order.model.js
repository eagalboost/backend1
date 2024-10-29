import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    serviceId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    buyerUsername: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);

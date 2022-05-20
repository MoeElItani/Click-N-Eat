import mongoose from "mongoose"
// Customer Orders Schema
const OrdersSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 30
    },
    phone: {
      type: String,
      required: true,
      maxlength: 20
    },
    address: {
      type: String,
      required: true,
      maxlength: 200
    },
    total: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      default: 0
    },
    cart: {
      type: [ Array ],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model("Orders", OrdersSchema);
import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  line_items:Object,
  name:String,
  email:String,
  city:String,
  postalCode:String,
  streetAddress:String,
  country:String,
  paid:Boolean,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);


// // models/Order.js
// // models/Order.js
// import mongoose, { model, Schema, models } from "mongoose";

// const OrderSchema = new Schema({
//   line_items: [{
//     product_id: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, required: true },
//   }],
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   city: { type: String, required: true },
//   postalCode: { type: String, required: true },
//   streetAddress: { type: String, required: true },
//   country: { type: String, required: true },
//   paid: { type: Boolean, default: false },
// }, {
//   timestamps: true,
// });

// export default models.Order || model("Order", OrderSchema);

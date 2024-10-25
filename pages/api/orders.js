// pages/api/orders.js
import { mongooseConnect } from '../../lib/mongoose';
import { Order } from '../../models/Order';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method == 'POST') {
    try {
      const order = await Order.create(req.body);
      res.status(201).json({ success: true, data: order });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}



// pages/api/orders.js
// import { mongooseConnect } from "@/lib/mongoose";
// import Order from "@/models/Order"; // Ensure you have an Order model

// export default async function handler(req, res) {
//   if (req.method == 'POST') {
//     await mongooseConnect();
//     const orderData = req.body;

//     // Create a new order
//     const newOrder = await Order.create(orderData);

//     res.status(201).json({ success: true, order: newOrder });
//   }
// }

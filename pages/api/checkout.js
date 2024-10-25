// import {mongooseConnect} from "@/lib/mongoose";
// import {Product} from "@/models/Product";
// import {Order} from "@/models/Order";
// const stripe = require('stripe')(process.env.STRIPE_SK);

// export default async function handler(req,res) {
//   if (req.method !== 'POST') {
//     res.json('should be a POST request');
//     return;
//   }
//   const {
//     name,email,city,
//     postalCode,streetAddress,country,
//     cartProducts,
//   } = req.body;
//   await mongooseConnect();
//   const productsIds = cartProducts;
//   const uniqueIds = [...new Set(productsIds)];
//   const productsInfos = await Product.find({_id:uniqueIds});

//   let line_items = [];
//   for (const productId of uniqueIds) {
//     const productInfo = productsInfos.find(p => p._id.toString() === productId);
//     const quantity = productsIds.filter(id => id === productId)?.length || 0;
//     if (quantity > 0 && productInfo) {
//       line_items.push({
//         quantity,
//         price_data: {
//           currency: 'BDT',
//           product_data: {name:productInfo.title},
//           unit_amount: quantity * productInfo.price * 100,
//         },
//       });
//     }
//   }

//   const orderDoc = await Order.create({
//     line_items,name,email,city,postalCode,
//     streetAddress,country,paid:false,
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: 'payment',
//     customer_email: email,
//     success_url: process.env.PUBLIC_URL + '/cart?success=1',
//     cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
//     metadata: {orderId:orderDoc._id.toString(),test:'ok'},
//   });

//   res.json({
//     url:session.url,
//   })

// }



import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }

  const {
    name, email, city,
    postalCode, streetAddress, country,
    line_items, // updated to match your front-end data structure
  } = req.body;

  await mongooseConnect();

  // Create the order document with line items
  const orderDoc = await Order.create({
    line_items, // line_items should already include product_id and title from the front-end
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  // Respond with success
  res.json({ success: true, orderId: orderDoc._id });
}

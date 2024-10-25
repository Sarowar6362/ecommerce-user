// // pages/api/products.js
// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";

// export default async function handler(req, res) {
//   await mongooseConnect();

//   const { title } = req.query;

//   if (title) {
//     // Use regex for case-insensitive search
//     const products = await Product.find({ title: { $regex: title, $options: "i" } });
//     return res.status(200).json({ products });
//   }

//   // Return all products if no title is provided
//   const products = await Product.find({});
//   return res.status(200).json({ products });
// }


import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();
  const { title } = req.query;

  // Find products based on title search
  const products = await Product.find({
    title: { $regex: title, $options: "i" }, // Case-insensitive search
  });

  res.status(200).json({ products: JSON.parse(JSON.stringify(products)) });
}

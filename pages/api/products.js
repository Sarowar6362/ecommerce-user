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
import { Category } from "@/models/Category";
export default async function handler(req, res) {
  await mongooseConnect();
  const { search, page = 1, limit = 70 } = req.query;
  const skip = (page - 1) * limit;

  let products = await Product.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { category: await Category.findOne({ name: { $regex: search, $options: "i" } }) },
    ]
  })
    .populate("category")
    .skip(skip)
    .limit(Number(limit));

  res.status(200).json({ products: JSON.parse(JSON.stringify(products)) });
}


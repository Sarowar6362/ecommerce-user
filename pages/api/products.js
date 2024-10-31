

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


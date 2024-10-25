// pages/categories/[categoryId].js
import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function CategoryProductsPage({ category, products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>{category ? `${category.name} Products` : "Products"}</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const { categoryId } = context.params;
  await mongooseConnect();

  // Fetch the category by ID
  const category = await Category.findById(categoryId);

  // Fetch products that belong to the selected category
  const products = await Product.find({ category: categoryId });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

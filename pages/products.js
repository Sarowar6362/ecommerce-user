import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar"; // Import SearchBar

export default function ProductsPage({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  // Function to filter products by title
  const handleSearch = async (query) => {
    const response = await fetch(`/api/products?title=${query}`);
    const data = await response.json();
    setProducts(data.products);
  };

  // Get the search query from the URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('title');
    if (query) {
      handleSearch(query);
    }
  }, []);

  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <SearchBar onSearch={handleSearch} /> {/* Include the search bar */}
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

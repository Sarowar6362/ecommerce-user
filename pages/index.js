import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Center from "@/components/Center";
import SearchBar from "@/components/SearchBar";
import Title from "@/components/Title";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function HomePage({ featuredProduct, initialProducts }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1); // Current page
  const [hasMoreProducts, setHasMoreProducts] = useState(initialProducts.length === 10); // Track if more products are available
  const itemsPerPage = 10;

  const handleSearch = async (query) => {
    router.push(`/products?title=${encodeURIComponent(query)}`);
  };

  const loadProducts = async (newPage) => {
    try {
      const response = await fetch(`/api/products?page=${newPage}&limit=${itemsPerPage}`);
      if (!response.ok) throw new Error("Failed to load products");
      
      const data = await response.json();
      if (data.products && data.products.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage(newPage);
        setHasMoreProducts(data.products.length === itemsPerPage); // Only true if the page is full
      } else {
        setHasMoreProducts(false); // No more products available
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <div style={{ marginTop: "20px" }}>
        <SearchBar onSearch={(query) => handleSearch(query)} />
      </div>
      <NewProducts products={products} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        {page > 1 && (
          <button onClick={() => loadProducts(page - 1)}>Previous</button>
        )}
        {hasMoreProducts && (
          <button onClick={() => loadProducts(page + 1)}>See More</button>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const initialProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 70 });
  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(initialProducts)),
    },
  };
}

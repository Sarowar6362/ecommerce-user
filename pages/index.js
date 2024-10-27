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
  const itemsPerPage = 70;

  const handleSearch = async (query) => {
    router.push(`/products?title=${encodeURIComponent(query)}`);
  };

  const loadProducts = async (newPage) => {
    const response = await fetch(`/api/products?page=${newPage}&limit=${itemsPerPage}`);
    const data = await response.json();
    setProducts(data.products);
    setPage(newPage);
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
        <button onClick={() => loadProducts(page + 1)}>See More</button>
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

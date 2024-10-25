import Link from "next/link";
import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import styled from "styled-components";
import Title from "@/components/Title";

// Styled component to display categories in a row
const CategoriesRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

// Styled component for the category box
const CategoryBox = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  text-align: center;
  min-width: 150px;
  cursor: pointer;
  color: #6c757d; /* Grayish color */
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

export default function CategoriesPage({ categories }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Categories</Title>
        <CategoriesRow>
          {categories.map((category) => (
            <Link href={`/categories/${category._id}`} key={category._id} passHref>
              <CategoryBox>{category.name}</CategoryBox>
            </Link>
          ))}
        </CategoriesRow>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({});
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

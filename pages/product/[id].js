import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

const Message = styled.div`
  margin-top: 10px;
  color: #28a745; // Green color for success
  font-size: 1rem;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    addProduct(product._id);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
  };

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button primary onClick={handleAddToCart}>
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
            <Message show={showMessage}>Added to cart!</Message>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

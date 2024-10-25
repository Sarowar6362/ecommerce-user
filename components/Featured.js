import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const Bg = styled.div`
  background-color: #222;
  color:#fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.2rem;
  @media screen and (min-width: 768px) {
    font-size:2rem;
  }
`;

const Desc = styled.p`
  color:#aaa;
  font-size:.96rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;

export default function Featured({product}) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
        <Column>
  <div>
    {product ? (
      <>
        <Title>{product.title}</Title>
        <Desc>{product.description}</Desc>
      
      </>
    ) : (<>
    
      <Title>Welcome to our</Title> <Title>website</Title>
      </>
    )}
  </div>
</Column>

          <Column>
            <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-3d38f.appspot.com/o/ss_transparent.png?alt=media&token=887a476d-26a0-4bfa-9461-8eac842410b5" alt=""/>
          </Column>
        </ColumnsWrapper>
      </Center>

    </Bg>
  );
}
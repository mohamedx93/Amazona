import React, { ReactElement, useContext } from 'react';

import { InferGetStaticPropsType } from 'next';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import Layout from '../components/Layout';
// import data from '../utils/data';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import { ICartItem, Store } from '../utils/store';
import axios from 'axios';
import router from 'next/router';
import { ProductObj } from '../utils/Interfaces';

const Home = ({
  products,
}: InferGetStaticPropsType<typeof getServerSideProps>): ReactElement => {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product: ProductObj) => {
    const existingItem: ICartItem = state.cart.cartItems.find(
      (x: ICartItem) => x._id === product._id
    );
    const newQuantity: number = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < newQuantity) {
      window.alert('Sorry, the current product stock is not sufficient');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: newQuantity },
    });
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

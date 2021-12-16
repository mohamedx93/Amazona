import React, { ReactElement, useContext } from 'react';
import { ICartItem, Store } from '../utils/store';
import Layout from '../components/Layout';
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import Image from 'next/image';

interface Props {}

export default function cart({}: Props): ReactElement {
  const { state } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  return (
    <Layout>
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <NextLink href="/">Go to shopping</NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item: ICartItem) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/[${item.slug}]`}>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={50}
                              width={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/product/[${item.slug}]`}>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <NextLink href={`/product/[${item.slug}]`}>
                          <Link>
                            <Select value={item.quantity}>
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="secondary">
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal (
                    {cartItems.reduce(
                      (a: number, c: ICartItem) => a + c.quantity,
                      0
                    )}{' '}
                    items): $
                    {cartItems.reduce(
                      (a: number, c: ICartItem) => a + c.price * c.quantity,
                      0
                    )}{' '}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary">
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

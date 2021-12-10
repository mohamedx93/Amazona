import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Product from '../../models/Product';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(data);
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'Seeded succesfully' });
});

export default handler;

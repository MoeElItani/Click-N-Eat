import dbConnect from '../../../lib/mongo'
import Orders from '../../../models/Orders'

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();
  // Get Orders from Database and store them in my API
  if (method === 'GET') {
    try {
      const orders = await Orders.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // Post Orders to the Database
  if (method === 'POST') {
    try {
      const order = await Orders.create(req.body);
      res.status(201).json(order);

    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler
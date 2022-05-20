import dbConnect from '../../../lib/mongo'
import Orders from '../../../models/Orders'

const handler = async (req, res) => {
  const { method, query: { id } } = req;

  await dbConnect();
  // Get Orders from Database and store them by ID
  if (method === "GET") {
    try {
      const orders = await Orders.findById(id);
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // Put Orders to Database by ID
  if (method === 'PUT') {
    try {
      // new:true to always retrieve the newest version from the database
      const order = await Orders.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}

export default handler
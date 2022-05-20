import dbConnect from '../../../lib/mongo';
import Item from '../../../models/Item'

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect()
  // Get Food Items from Database and store them in my API
  if (method === "GET") {
    try {
      const items = await Item.find();
      res.status(200).json(items);

    } catch (err) {
      res.status(500).json(err);
    }
  }
  // Post New Food Items to the Database
  if (method === "POST") {
    try {
      const item = await Item.create(req.body);
      res.status(201).json(item);

    } catch (err) {
      res.status(500).json(err);
    }
  }
}
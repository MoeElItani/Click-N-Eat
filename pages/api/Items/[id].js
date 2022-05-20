import dbConnect from '../../../lib/mongo'
import Item from '../../../models/Item'

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect()
  // Get Food Items from Database and store them by ID
  if (method === "GET") {
    try {
      const foodItem = await Item.findById(id);
      res.status(200).json(foodItem);

    } catch (err) {
      res.status(500).json(err);
    }
  }
  // Put Food Items to Database by ID
  if (method === "PUT") {
    try {
      const item = await Item.create(req.body);
      res.status(201).json(item);


    } catch (err) {
      res.status(500).json(err);
    }
  }
  // Delete Food Items from Database by ID
  if (method === "DELETE") {
    try {
      await Item.findByIdAndDelete(id);
      res.status(200).json('Food Item Has Been Deleted ');


    } catch (err) {
      res.status(500).json(err);
    }
  }
}
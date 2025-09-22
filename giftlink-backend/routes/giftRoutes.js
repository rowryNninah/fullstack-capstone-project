const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    // Task 1: Connect to MongoDB and store connection to db constant
    const db = await connectToDatabase();

    // Task 2: use the collection() method to retrieve the gift collection
    const collection = db.collection("gifts");

    // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
    const gifts = await collection.find({}).toArray();
    const giftsWithId = gifts.map(gift => ({
  ...gift,
  id: gift.id || (gift._id ? gift._id.toString() : undefined),
}));
    // Task 4: return the gifts using the res.json method
    res.json(giftsWithId);
  } catch (e) {
    console.error("Error fetching gifts:", e);
    res.status(500).send("Error fetching gifts");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const id = req.params.id;
    // Find by the 'id' field (string), not _id
    const gift = await collection.findOne({ id: id });
    if (!gift) {
      return res.status(404).send("Gift not found");
    }
    const giftWithId = {
      ...gift,
      id: gift.id || (gift._id ? gift._id.toString() : undefined),
    };
    res.json(giftWithId);
  } catch (e) {
    console.error("Error fetching gift:", e);
    res.status(500).send("Error fetching gift");
  }
});

// Add a new gift
router.post("/", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gift = await collection.insertOne(req.body);

    res.status(201).json({ ...req.body, _id: gift.insertedId });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

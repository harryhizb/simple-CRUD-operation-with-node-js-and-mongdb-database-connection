const { ObjectId, db } = require("../models/models");

const addingBook = async (req, res) => {
  try {
    const newStudent = req.body;
    await db.collection("enrolledStudents").insertOne(newStudent);
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const allBooks = async (req, res) => {
  try {
    const allStudents = await db
      .collection("enrolledStudents")
      .find({})
      .toArray();
    res.json(allStudents);
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const SpecificBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const query = { _id: new ObjectId(id) };

    const student = await db.collection("enrolledStudents").findOne(query);
    if (!student) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error retrieving book by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const query = { _id: new ObjectId(id) };

    const updatedStudent = req.body;
    const updateResult = await db
      .collection("enrolledStudents")
      .updateOne(query, { $set: updatedStudent });

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    const query = { _id: new ObjectId(bookId) };

    const deleteResult = await db
      .collection("enrolledStudents")
      .deleteOne(query);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchingSize = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;

    const enrolledStudents = await db
      .collection("enrolledStudents")
      .find()
      .skip(skip)
      .limit(pageSize)
      .toArray();

    res.json(enrolledStudents);
  } catch (error) {
    console.error("Error retrieving enrolled students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addingBook,
  allBooks,
  SpecificBook,
  updateBook,
  deleteBook,
  fetchingSize,
};

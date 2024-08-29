import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find({});
    return res.status(200).send(allBooks);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

// Upload new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "all fields required",
      });
    }

    const { title, author, publishYear } = req.body;

    const book = await Book.create({ title, author, publishYear });
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

// Get single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.send(book);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// Update Book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "all fields required",
      });
    }

    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, {
      title: title,
      author: author,
      publishYear: publishYear,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).send(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

export default router;

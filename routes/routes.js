const express = require("express");
const controller = require("../controllers/controllers");

const router = express.Router();

router.post("/addingBook", controller.addingBook);
router.get("/allBooks", controller.allBooks);
router.get("/specificBook/:id", controller.SpecificBook);
router.patch("/updatingBook/:id", controller.updateBook);
router.delete("/deletingBook/:id", controller.deleteBook);
router.get("/fetchingSize", controller.fetchingSize);

module.exports = router;

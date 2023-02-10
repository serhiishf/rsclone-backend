const express = require("express");
const {
  validCreateBookSchema,
  validUpdateBookSchema,
  validUpdateStatusSchema,
  validUpdateResumeSchema,
} = require("../../models");
const { authorization, validation, ctrlWrapper } = require("../../middleware");
const { booksCtrl } = require("../../controllers");

const router = express.Router();

// get all books:
router.get(
  "/",

  ctrlWrapper(authorization),

  ctrlWrapper(booksCtrl.getAllProducts)
);

//get one by id:
router.get(
  "/book",

  ctrlWrapper(authorization),

  ctrlWrapper(booksCtrl.getBookById)
);

//create:
router.post(
  "/create",

  ctrlWrapper(authorization),

  validation(validCreateBookSchema),

  ctrlWrapper(booksCtrl.createBook)
);

//delete:
router.delete(
  "/delete",

  ctrlWrapper(authorization),

  ctrlWrapper(booksCtrl.deleteBook)
);

// update status:
router.patch(
  "/update-status",

  ctrlWrapper(authorization),

  validation(validUpdateStatusSchema),

  ctrlWrapper(booksCtrl.updateStatus)
);
// update resume and rating:
router.patch(
  "/update-resume",

  ctrlWrapper(authorization),

  validation(validUpdateResumeSchema),

  ctrlWrapper(booksCtrl.updateResume)
);
// get one by search, get
// update one -  all info, patch or put

module.exports = router;

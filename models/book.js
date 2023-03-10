const { Schema, model } = require("mongoose");
const Joi = require("joi");

const booksSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  year: {
    type: Number,
    default: null,
  },
  pages: {
    type: Number,
    required: [true, "Number of pages is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "active", "done"],
      message: "{VALUE} is not supported",
    },
    default: "pending",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  resume: {
    type: "String",
    default: "",
  },
  rating: {
    type: Number,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: [5, "Must be maximum 5, got {VALUE}"],
    default: null,
  },
});

const validCreateBookSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),
  author: Joi.string().required().messages({
    "string.base": `"author" should be a type of 'text'`,
    "string.empty": `"author" cannot be an empty field`,
    "any.required": `"author" is a required field`,
  }),
  year: Joi.number().messages({
    "string.base": `"year" should be a type of 'number'`,
    "string.empty": `"year" cannot be an empty field`,
  }),

  pages: Joi.number().required().messages({
    "string.base": `"pages" should be a type of 'number'`,
    "string.empty": `"pages" cannot be an empty field`,
    "any.required": `"pages" is a required field`,
  }),
});

const validUpdateBookSchema = Joi.object({
  bookId: Joi.string().required(),

  name: Joi.string().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  author: Joi.string().messages({
    "string.base": `"author" should be a type of 'text'`,
    "string.empty": `"author" cannot be an empty field`,
  }),
  year: Joi.number().messages({
    "string.base": `"year" should be a type of 'number'`,
    "string.empty": `"year" cannot be an empty field`,
  }),

  pages: Joi.number().messages({
    "string.base": `"pages" should be a type of 'number'`,
    "string.empty": `"pages" cannot be an empty field`,
  }),

  status: Joi.string().valid("pending", "active", "done").messages({
    "string.base": `"status" should be a type of 'text'`,
    "string.empty": `"status" cannot be an empty field`,
  }),
});

const validUpdateStatusSchema = Joi.object({
  bookId: Joi.string().required(),
  status: Joi.string().valid("pending", "active", "done").required().messages({
    "string.base": `"status" should be a type of 'text'`,
    "string.empty": `"status" cannot be an empty field`,
    "any.required": `"status" is a required field`,
  }),
});

const validQueryStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "active", "done").required().messages({
    "string.base": `"status" should be a type of 'text'`,
    "string.empty": `"status" cannot be an empty field`,
    "any.required": `"status" is a required field`,
  }),
});

const validUpdateResumeSchema = Joi.object({
  bookId: Joi.string().required(),
  resume: Joi.string().messages({
    "string.base": `"resume" should be a type of 'text'`,
  }),
  rating: Joi.number().min(1).max(5).messages({
    "string.base": `"rating" should be a type of 'number'`,
    "string.empty": `"rating" cannot be an empty field`,
    "string.min": `"rating" should have a minimum length of {#limit}`,
    "string.max": `"rating" should have a maximum length of {#limit}`,
  }),
});

const Book = model("book", booksSchema);

module.exports = {
  Book,
  validCreateBookSchema,
  validUpdateBookSchema,
  validUpdateStatusSchema,
  validUpdateResumeSchema,
  validQueryStatusSchema,
};

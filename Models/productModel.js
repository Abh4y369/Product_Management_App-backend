const mongoose = require("mongoose");

const variantSchema =
  new mongoose.Schema(
    {
      ram: {
        type: String,
        required: true,
        trim: true,
      },

      price: {
        type: Number,
        required: true,
      },

      qty: {
        type: Number,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const productSchema =
  new mongoose.Schema(
    {
      productName: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      subCategoryId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "subcategories",
        required: true,
      },

      variants: {
        type: [variantSchema],
        validate: {
          validator: function (v) {
            return v.length > 0;
          },
          message:
            "At least one variant is required",
        },
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "products",
  productSchema
);
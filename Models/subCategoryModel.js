const mongoose = require("mongoose");

const subCategorySchema =
  new mongoose.Schema(
    {
      subCategoryName: {
        type: String,
        required: true,
        trim: true,
      },

      categoryId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const subcategories = mongoose.model("subcategories",subCategorySchema);
module.exports=subcategories
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true,
      
    },

    email: {
      type: String,
      required: true,
      unique: true,
    

    },

    password: {
      type: String,
      required: true,
    },
     wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
},
 {
    timestamps: true,
  }
);

const users= mongoose.model('users',userSchema);

module.exports = users;
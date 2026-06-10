const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({



});

const users= mongoose.model('users',userSchema);

module.exports = users;
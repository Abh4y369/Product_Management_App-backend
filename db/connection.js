const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING).then(res=>{
    console.log("Server connected to MongoDB");
}).catch(err=>{
    console.log(err);
});

module.exports = mongoose;
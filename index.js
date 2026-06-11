require('dotenv').config();
require('./db/connection');
const express = require('express');
const cors = require('cors');
const router=require('./Routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});



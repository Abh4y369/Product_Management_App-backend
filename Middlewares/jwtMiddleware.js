const jwt=require('jsonwebtoken');

const jwtMiddle=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const verifiedRes=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.payload=verifiedRes._id;
        next();

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"JWT ERROR"+err});
    }
}

module.exports=jwtMiddle
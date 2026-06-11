const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const filename=`Image-${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="image/jpg" || file.mimetype==="image/png" || file.mimetype==="image/jpeg" || file.mimetype==="image/webp"){
        cb(null,true)
    }
    else{
        cb(new Error("Only image files are allowed"), false)
    }
}
 
const multerConfig=multer({
    storage,
    fileFilter
})

module.exports=multerConfig
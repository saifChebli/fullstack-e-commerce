import multer from 'multer'



const storage = multer.diskStorage({
    destination : (req,file,cb) => {
      cb(null , "uploads/products")
    },
    filename : (req,file,cb) => {
        cb(null , `${Date.now()}-${Math.round(Math.random() * 100)}${file.originalname}`)
    }
})


const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith("image")) cb(null , true)
        else cb(new Error("Only images allowed") , false)
}

// upload pdf file : mimetype => pdf/fdhfbdhkfkhdkfdk.pdf
// upload png file : mimetype => image/dfdfbdkhbfkhdbfdhk.png


export const upload = multer({
    storage,
    fileFilter,
    limits : { 
        files : 8 , 
        fileSize : Infinity
     }
})
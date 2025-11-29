import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    totalPrice: {type: Number, default: 0},
    status: {type: String, enum: ["pending", "paid", "accepted", "cancelled", "shipped"], default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
        { 
           product :  { type: mongoose.Schema.Types.ObjectId, ref: "Product" } ,
           quantity : { type : Number , default : 1 }
        }
    ]  
},{
    timestamps : true
})


export default mongoose.model("Order" , orderSchema)
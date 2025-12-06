import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    totalPrice: {type: Number, default: 0},
    status: {type: String, enum: ["pending", "paid", "accepted", "cancelled", "shipped"], default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: [
        { 
           product :  { type: mongoose.Schema.Types.ObjectId, ref: "Product" } ,
           quantity : { type : Number , default : 1 },
           price : { type : Number , required : true}
        }
    ],
    isPaid : { type : Boolean , default : false },
    paidAt: Date,
    paymentResult : { id : String , status : String , update_time : Date , email_address : String}
},{
    timestamps : true
})


export default mongoose.model("Order" , orderSchema)
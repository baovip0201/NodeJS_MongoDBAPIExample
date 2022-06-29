const mongoose=require('mongoose');
const {Schema} =mongoose;
const uniqueValidator=require('mongoose-unique-validator');

const userSchema= new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
});

userSchema.set("toJSON", {
    transform: (document, returnObject)=>{
       returnObject.id=returnObject._id.toString();
       delete returnObject._id;
       delete returnObject._v;
       delete returnObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "Email is already in user"});

const User=mongoose.model("user", userSchema);
module.exports=User;
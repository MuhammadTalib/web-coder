const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')


const userSchema =new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

userSchema.statics.findByCredentials = async(email, password)=>{
    
    const user = await User.findOne({email});
    if(!user){
        return {message:'Email Not Found!',status:false}
    }else{
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return {message:'Password Incorrect!',status:false};
        }
        user.status=true;
        return user;
    }
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },"process.env.JWT_SECRET", { expiresIn: '7 days' })

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
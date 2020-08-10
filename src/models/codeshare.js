const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const codeSchema =new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        trim:true
    },
    Code:{
        type:String,
        required:true
    },
    Syntax:{
        type:String,
        required:true,
        trim:true
    },
    URL:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    ModifiedDate:{
        type:String,
        required:true,
        trim:true
    },
    CreatedDate:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

const Code = mongoose.model('Code',codeSchema)

module.exports = Code
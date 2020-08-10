const express = require('express') 
const User = require('../models/user')
const router = new express.Router()

router.post('/api/signup',async (req,res)=>{
    const user = new User(req.body)
    
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token,
            status:true
        })

    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/api/login',async (req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        if(user.status){
            const token = await user.generateAuthToken()
            return res.send({user:user,token,status:true})
        }
        res.status(400).send({user:user,status:false})
    }catch(e){
        res.status(400).send("Unable to Login");
    }

})

module.exports = router
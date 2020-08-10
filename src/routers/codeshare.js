const express = require('express') 
const Code = require('../models/codeshare')
const router = new express.Router();

router.post('/api/newcodeshare',async (req,res)=>{
    console.log("req",req)
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var length=6
    var url = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    var date= new Date();
    var Month=month[date.getMonth()]
    var cDate=date.getDate()
    var year=date.getFullYear()
    var title=Month+" "+cDate+", "+year

    const code = new Code({
        Title : title,
        Code:" ",
        URL:url,
        Syntax:"Plain Text",
        ModifiedDate:title,
        CreatedDate:title
    })
    console.log("code",code)
    
    try{
        await code.save();
        res.status(201).send({
            code,
            status:true
        })

    }catch(e){
        res.status(400).send(e)
    }

})
router.post('/api/yourcodeshares', async (req,res)=>{
    try{
        var codes=[]
        await Code.find({}).then((codeArr)=>{
            codes=codeArr
        })
        res.status(201).send(codes)
    }catch(e){
        res.status(400).send();
    }     
})
router.post('/api/deleteCode', async (req,res)=>{
    try{
        const code = await Code.findOneAndDelete({_id:req.body._id})
        if(!code){
            res.status(404).send()
        }
        var codes=[]
        await Code.find({}).then((codeArr)=>{
            codes=codeArr
        })
        res.status(201).send(codes)
    }catch(e){
        res.status( 500).send()
    }
})
module.exports = router
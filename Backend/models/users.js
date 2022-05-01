const express = require('express');
const router = express.Router();
const User = require('./../schemas/users_schema');

router.post('/register',async (req,res) => {
    const data = req.body
    console.log("Register")
    console.log(data)
    if (data.username && data.password && data.display_name) {
        await User.find({username:data.username}).then(dato=>{
            if(dato==''){
                const newuser = new User({
                    display_name: req.body.display_name,
                    username: req.body.username,
                    password: req.body.password
                })
                newuser.save().then(result =>{
                    console.log("Éxito "+result)
                    res.status(201).send(result)
                }).catch(e=>{
                    console.log(e)
                    res.status(500).json({
                        error:e
                    })
                })
            }else{
                res.status(404).json({message:'El usuario ya existe'})
            }
        })
        
    }else{
        res.status(500).json({message:'No Content'})
    }
});

router.post('/login',async (req,res) => {
    const data = req.body
    console.log("Login")
    console.log(data)
    if (data.username!='' && data.password!='') {
        await User.find({username:data.username,password: data.password}).then(data=>{
            console.log(data)
            if(data!=''){
                res.status(201).send(data[0])
            }else{
                res.status(404).send([])
            }
        }).catch(e=>{
            console.log(e)
            res.status(500).json({
                error:e
            })
        })
    }else{
        res.status(500).json({message:'No Content'})
    }
});

router.post('/prev-login',async (req,res) => {
    const data = req.body
    console.log("Prev-Login")
    console.log(data)
    if (data.user_id!='') {
        User.find({_id:data.user_id},function(e,data){
            if(e){
                console.log(e)
                res.status(500).json({
                    error:e
                })
            }else{
                if(data!=''){
                    console.log("Éxito "+data)
                    res.send(data[0])
                }
            }
        })
    }else{
        res.status(500).json({message:'No Content'})
    }
});

router.get('/',async (req,res) => {
    const data = req.query
    console.log("Get/")
    if(data.user_id!=''){
        await User.find({_id:data.user_id}).then(data=>{
            console.log(data)
            if(data!=''){
                res.status(201).send(data[0])
            }else{
                res.status(404).send([])
            }
        }).catch(e=>{
            console.log(e)
            res.status(500).json({
                error:e
            })
        })
    }else{
        res.status(404).json("No se ingresó userID")
    }
});

module.exports = router;
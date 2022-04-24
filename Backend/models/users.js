const express = require('express');
const router = express.Router();
const User = require('./../schemas/users_schema');

router.post('/register',async (req,res) => {
    const data = req.body
    console.log(data)
    if (data!='') {
        const newuser = new User({
            name: req.body.display_name,
            username: req.body.username,
            password: req.body.password
        })
        await newuser.save().then(result =>{
            console.log("Éxito "+result)
            res.status(201).json({
                message:"Operación realizada con éxito"
            })
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

router.post('/login',async (req,res) => {
    const data = req.body
    console.log(data)
    if (data.username!='' && data.password!='') {
        await User.find({username:data.username,password: data.password}).then(data=>{
            console.log(data)
            if(data!=''){
                res.status(201).send(data)
            }else{
                res.status(404).json("No se encontró el usuario")
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
                    res.send(data)
                }else{
                    res.status(404).json({
                    error:"No se encontró el usuario"
                    })
                }
            }
        })
    }else{
        res.status(500).json({message:'No Content'})
    }
});

router.get('/',async (req,res) => {
    const data = req.query
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
                    res.status(201).send(data)
                }else{
                    res.status(404).json({
                    error:"No se encontró el usuario"
                    })
                }
            }
        })
    }else{
        res.status(500).json({message:'No Content'})
    }
});

module.exports = router;
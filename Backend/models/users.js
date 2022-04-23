const express = require('express');
const router = express.Router();
const User = require('./../schemas/users_schema');

router.post('/register',async (req,res) => {
    const data = req.body
    console.log(data)
    if (data) {
        const newuser = new User({
            name: req.body.display_name,
            username: req.body.username,
            password: req.body.password
        })
        newuser.save().then(result =>{
            console.log(result)
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
        res.status(404).json({message:'No Content'})
    }
});

router.post('/login',async (req,res) => {
    const data = req.body
    if (data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({message:'No Content'})
    }
});

router.post('/prev-login',async (req,res) => {
    const data = req.body
    if (data) {
        res.status(200).json(data)
    }else{
        res.status(404).json({message:'No Content'})
    }
});

router.get('/',async (req,res) => {
    res.status(200).json(req.query.user_id)
});

module.exports = router;
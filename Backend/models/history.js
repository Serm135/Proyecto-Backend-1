const express = require('express');
const router = express.Router();

router.get('/:user_id',async (req,res) => {
    res.status(200).json(req.params.user_id)
});

module.exports = router;
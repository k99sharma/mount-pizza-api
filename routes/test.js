const express = require('express');
const router = express.Router();

router.get('/test', (req, res)=>{
    res.send('Working Fine!');
})

module.exports = router;